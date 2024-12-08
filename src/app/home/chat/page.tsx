'use client'

import MobileNavigation from "@/components/ui/navigation/MobileNavigation"
import Image from "next/image"
import sendArrow from "$/public/images/svg/dark-blue-arrow-left.svg";
import addButton from "$/public/images/svg/add-button.svg";
import { useEffect, useRef, useState } from "react";
import { RootState, useAppSelector } from "@/store/store";
import ChatText from "@/components/ui/chat/ChatText";
import ChatBox from "@/components/ui/chat/ChatBox";
import Link from "next/link";
import { setOpenChatId } from "@/store/openChatSlice";
import { useDispatch } from "react-redux";
import { Chat as IChat, ChatProfile, Message, BaseUser } from "@/types";
import { checkIfChatExists, createChat, getChatById, listChatsByUserId, listenToMessages, sendMessage } from "@/lib/firebase/app";
import alert from "@/types/alert";
import standardProfile from "$/public/images/paintings/standard-profile-picture.png";
import { Timestamp } from "firebase/firestore";
import Popover, { PopoverContent, PopoverTrigger } from "@/components/ui/utils/Popover";
import ContactListModal from "@/components/ui/utils/ContactListModal";
import { fetchWrapper } from "@/lib/api/fetch";

interface usersResp {
  usuarios: BaseUser[]
}

const Chat = () => {

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [openChat, setOpenChat] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const [userChats, setUserChats] = useState<IChat[]>([])
  const [messageUser, setMessageUser] = useState<ChatProfile>()
  const [availableUsers, setAvailableUsers] = useState<BaseUser[]>([])
  const [userChatLoading, setUserChatLoading] = useState<boolean>(true)
  const [excludedIds, setExcludedIds] = useState<number[]>([])
  const [users, setUsers] = useState<BaseUser[]>([])

  const chatContainerRef = useRef<HTMLDivElement>(null)

  const openChatId = useAppSelector((state: RootState) => state.chatOpenId.openChatId)
  const currentUser = useAppSelector((state: RootState) => state.user)

  const dispatch = useDispatch()

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newMessage.trim()) return

    try {
      await sendMessage({
        roomId: openChat,
        senderId: currentUser.id as number,
        text: newMessage,
      });
      setNewMessage('')
    } catch (error) {
      console.error("Erro ao enviar a mensagem: ", error)
      alert({
        title: 'Erro ao enviar mensagem',
        icon: 'error',
      })
    }
  }

  const selectConversation = async (chatId: string) => {
    dispatch(setOpenChatId(chatId))
  }

  const fetchUsers = async () => {
    const resp = await fetchWrapper<usersResp>('v1/aquarela/users')
    if (resp && resp.usuarios) {
      setUsers(resp.usuarios)
    }
  }

  const handleAvailableUsers = () => {
    const availableUsers = users.filter(
      user => Boolean(Number(user.disponibilidade)) === true && user.id as number !== currentUser.id as number && !excludedIds.includes(user.id as number)
    )
    setAvailableUsers(availableUsers)
  }

  const handleSelectNewChat = async (user: BaseUser) => {

    setModalOpen(false)

    const existingChat = await checkIfChatExists(user.id as number, currentUser.id as number)

    if (existingChat) {
      dispatch(setOpenChatId(existingChat.id));
      return;
    }

    const [nickname1, nickname2] = [currentUser.nome_usuario, user.nome_usuario].sort()
    const newChatId = `${nickname1}-${nickname2}`

    const chat: IChat = {
      id: newChatId,
      user1: {
        id: currentUser.id as number,
        nickname: currentUser.nome_usuario,
        avatar: currentUser.foto_usuario || '',
      },
      user2: {
        id: user.id as number,
        nickname: user.nome_usuario,
        avatar: user.foto_usuario || '',
      },
    }

    const chatResp = await createChat(chat)

    if (chatResp) {
      dispatch(setOpenChatId(newChatId))
      setExcludedIds((prev) => [...prev, user.id as number])
      handleAvailableUsers()
    }

  }

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }

  useEffect(() => {

    if (!currentUser.id) return

    const unsubscribe = listChatsByUserId(
      currentUser.id as number,
      (updatedChats) => {
        setUserChats(updatedChats)
        setExcludedIds(updatedChats.flatMap(chat => [chat.user1.id, chat.user2.id]))
        setUserChatLoading(false)
      },
      (error) => {
        console.error("Erro ao escutar chats:", error)
        setUserChats([])
      }
    )
    return () => {
      if (unsubscribe) unsubscribe()
    }

  }, [currentUser.id])

  useEffect(() => {
    setOpenChat(openChatId ? openChatId : '')
  }, [openChatId])

  useEffect(() => {
    if (openChat != '') {
      const unsubscribe = listenToMessages(
        openChat,
        (updatedMessages) => {
          setMessages(updatedMessages)
        },
        (error) => {
          console.error("Erro ao ouvir mensagens:", error)
        }
      )
      return () => {
        unsubscribe()
      }
    }
  }, [openChat])

  useEffect(() => {

    if (!openChat) return

    const fetchChat = async () => {
      const selectedChat = await getChatById(openChat)
      if (selectedChat) {
        setMessageUser(selectedChat.user1.id === currentUser.id ? selectedChat.user2 : selectedChat.user1)
      }
    }
    fetchChat()
  }, [openChat])

  useEffect(() => {
    if(!userChatLoading)
      handleAvailableUsers()
  }, [modalOpen, userChatLoading])

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <main className="grid grid-cols-[3fr_8fr] h-[90vh] relative -mt-4">
      <div className="flex flex-col pt-6 border-r border-r-blue-6/60">
        <div className="h-[5vh] flex items-center justify-between px-3">
          <h1 className="text-blue-1 font-medium text-[180%] px-3 text-center">Mensagens</h1>
          <Popover open={modalOpen} onOpenChange={(open) => setModalOpen(open)} placement="bottom-start">
            <PopoverTrigger asChild onClick={() => setModalOpen((v) => !v)}>
              <div className="flex items-center justify-center h-full cursor-pointer">
                <Image
                  src={addButton}
                  alt="Adicionar conversa"
                  width={200}
                  height={200}
                  className="h-4/5 w-auto"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <ContactListModal loading={userChatLoading} contactList={availableUsers} handleSelect={(e) => handleSelectNewChat(e)} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col overflow-y-scroll gap-3 p-3 h-[calc(100vh-(15vh+1.5rem))]">
          {userChatLoading ? (
            <div className="flex items-center justify-center text-blue-1 text-2xl text-center h-[calc(100vh-(15vh+1.5rem))]">
              <span className="w-3/5">
                Carregando suas conversas...
              </span>
            </div>
          ) : userChats.length > 0 ? (
            [...userChats]
              .sort((a, b) => {
                const timestampA = a.lastMessage?.timestamp?.toMillis?.() || 0;
                const timestampB = b.lastMessage?.timestamp?.toMillis?.() || 0;
                return timestampB - timestampA;
              })
              .map((chat) => {
                const otherUser = chat.user1.id === currentUser.id ? chat.user2 : chat.user1;
                return (
                  <ChatBox
                    id={chat.id}
                    name={otherUser.nickname}
                    avatar={otherUser.avatar}
                    lastMessage={chat.lastMessage}
                    selectConversation={() => selectConversation(chat.id)}
                    key={chat.id}
                  />
                );
              })
          ) : (
            <div className="flex items-center justify-center text-blue-1 text-2xl text-center h-[calc(100vh-(15vh+1.5rem))]">
              <span className="w-3/5">
                Suas conversas aparecerão aqui!
              </span>
            </div>
          )}
        </div>
      </div>
      {openChat ? (
        <div className="grid grid-rows-[10vh_70vh_10vh]">
          <div className="p-4 flex gap-3 items-center border-b border-b-blue-6/60">
            <Image
              src={messageUser ? messageUser.avatar : standardProfile}
              alt="Perfil"
              width={500}
              height={500}
              className="h-full w-auto aspect-square object-cover rounded-full"
            />
            <Link href={`/home/profile/${messageUser?.nickname}`}>
              <h2 className="text-blue-1 font-medium text-2xl">{messageUser?.nickname}</h2>
            </Link>
          </div>
          <div className="flex flex-col overflow-y-scroll" ref={chatContainerRef}>
            <div className="p-6 w-full grow grid grid-flow-row auto-rows-min content-end gap-2">
              {messages.map((msg) => (
                <ChatText key={`${msg.userId}-${msg.timestamp?.toJSON().seconds}`} currentUser={msg.userId == currentUser.id} text={msg.text} timestamp={msg.timestamp as Timestamp} />
              ))}
            </div>
          </div>
          <form onSubmit={handleSendMessage} className="flex py-3 px-6 text-blue-2 text-[120%]">
            <fieldset className="flex gap-3 w-full bg-blue-6/40 hover:bg-blue-6/60 ease-linear duration-100 p-3 rounded-lg">
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="grow px-2 bg-transparent placeholder:text-blue-2" placeholder="Mensagem..." />
              <button className="flex items-center justify-center">
                <Image
                  src={sendArrow}
                  alt="Enviar mensagem"
                  width={500}
                  height={500}
                  className="h-full w-auto rotate-180"
                />
              </button>
            </fieldset>
          </form>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-blue-1 font-medium text-3xl text-center w-4/5 select-none">
            Vamos esculpir essa conversa juntos! Escolha uma mensagem para começar.
          </p>
        </div>
      )}
      <div className="absolute inset-0 z-50 pointer-events-none"></div>
      <MobileNavigation />
    </main>
  )
}

export default Chat
