import Image, { StaticImageData } from "next/image"
import React, { useEffect, useState } from "react"
import { DateTime } from 'luxon'
import standardProfile from "$/public/images/paintings/standard-profile-picture.png"
import { RootState, useAppSelector } from "@/store/store"
import { LastMessage } from "@/types"
import { Timestamp } from "firebase/firestore"

interface ChatBoxProps {
    id: string
    name: string
    avatar: string | StaticImageData
    lastMessage?: LastMessage
    selectConversation: (id: string) => void
}

const ChatBox: React.FC<ChatBoxProps> = ({ name, avatar, lastMessage, selectConversation, id }) => {

    const [image, setImage] = useState<string | StaticImageData>(standardProfile)
    const openChatId = useAppSelector((state: RootState) => state.chatOpenId.openChatId)
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
    const [messageTime, setMessageTime] = useState<string>('Agora')

    const setMessage = (timestamp: Timestamp): string => {

        const now = DateTime.now()
        const messageDate = DateTime.fromJSDate(timestamp.toDate())
        const diff = now.diff(messageDate, ['years', 'months', 'days', 'hours', 'minutes'])        
            
        let timeAgo = ''        
        
        if (diff.as('seconds') < 60) {
            timeAgo = 'Agora'
        } else if (diff.as('minutes') < 60) {  
            timeAgo = messageDate.toFormat('HH:mm')
        } else if (diff.as('hours') < 24) {  
            timeAgo = `Há ${diff.hours} ${diff.hours > 1 ? 'horas' : 'hora'}`
        } else if (diff.as('days') < 30) {  
            timeAgo = `Há ${diff.days} ${diff.days > 1 ? 'dias' : 'dia'}`
        } else if (diff.as('months') < 12) {  
            timeAgo = `Há ${diff.months} ${diff.months > 1 ? 'meses' : 'mês'}`
        } else {  
            timeAgo = `Há ${diff.years} ${diff.years > 1 ? 'anos' : 'ano'}`
        }

        return timeAgo

    }

    useEffect(() => {
        const isOpen = openChatId == id ? true : false
        setIsChatOpen(isOpen)
    }, [openChatId, id])

    useEffect(() => {
        setImage(avatar != '' ? avatar as string : standardProfile)
    }, [avatar])

    useEffect(() => {
        if (lastMessage?.timestamp) {
            const time = setMessage(lastMessage?.timestamp)
            setMessageTime(time)
        }
    }, [lastMessage?.timestamp])

    return (
        <button
            onClick={() => selectConversation(id)}
            className={`p-3 select-none hover:bg-blue-3/20 flex ease-linear duration-150 items-center gap-3 rounded-md h-20 ${isChatOpen && 'bg-blue-3/20'}`} type="button"
        >
            <Image
                src={image}
                alt="Perfil"
                width={100}
                height={100}
                className="h-full w-auto aspect-square rounded-full object-cover"
            />
            <div className="flex items-start flex-col grow">
                <h3 className="text-blue-1 font-medium text-xl"> {name} </h3>
                {lastMessage && (
                    <p className="text-blue-2 text-start w-[10vw] overflow-hidden whitespace-nowrap text-ellipsis block">
                        {lastMessage.text}
                    </p>
                )}
            </div>
            {lastMessage?.timestamp != null && (
                <div className="text-blue-1 text-nowrap shrink-0 w-auto">
                    {messageTime}
                </div>
            )}
        </button>
    )
}

export default ChatBox