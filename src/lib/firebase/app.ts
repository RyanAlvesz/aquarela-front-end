import { Chat, ChatProfile, Message } from '@/types';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { doc, Firestore, getFirestore, onSnapshot, orderBy, setDoc, updateDoc, collection, addDoc, serverTimestamp, query, where, getDocs, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage, StorageReference } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA9J6I39jSK3mineUok6Vn7-2tnCp1xMpc",
  authDomain: "tcc-aquarela.firebaseapp.com",
  projectId: "tcc-aquarela",
  storageBucket: "tcc-aquarela.appspot.com",
  messagingSenderId: "343096271931",
  appId: "1:343096271931:web:5336ae530e8ef4e386281e"
}

const app: FirebaseApp = initializeApp(firebaseConfig)
const storage: FirebaseStorage = getStorage(app)
const db: Firestore = getFirestore(app)

export const uploadImage = async (file: File, storagePath: string): Promise<string | undefined> => {
  let url: string | undefined
  const storageRef: StorageReference = ref(storage, `${storagePath}/${file.name}`)

  await uploadBytes(storageRef, file)
    .then(async (snapshot) => {
      url = await getDownloadURL(snapshot.ref)
    })

  return url
}

interface SendMessageParams {
  roomId: string
  senderId: number
  text: string
}

export const sendMessage = async ({ roomId, senderId, text }: SendMessageParams): Promise<void> => {
  try {
    const messagesRef = collection(db, "chats", roomId, "messages")
    await addDoc(messagesRef, {
      text,
      userId: senderId,
      timestamp: serverTimestamp(),
    })
    const chatRef = doc(db, "chats", roomId)
    await updateDoc(chatRef, {
      lastMessage: {
        text,
        timestamp: serverTimestamp(),
      },
    })
    console.log("Mensagem enviada!")
  } catch (error) {
    console.error("Erro ao enviar mensagem: ", error)
  }
}

export const createChat = async ({ id, user1, user2 }: Chat): Promise<boolean> => {
  try {
    const chatRef = doc(db, "chats", id)
    await setDoc(chatRef, {
      user1: user1,
      user2: user2,
      lastMessage: {
        text: "",
        timestamp: null,
      },
    })
    console.log(`Chat criado com sucesso!`)
    return true
  } catch (error) {
    console.error("Erro ao criar o chat:", error)
    return false
  }
}

export const checkIfChatExists = async (userId1: number, userId2: number): Promise<Chat | null> => {
  try {
    const chatRef = collection(db, "chats")
    const q = query(
      chatRef,
      where("user1.id", "in", [userId1, userId2]),
      where("user2.id", "in", [userId1, userId2])
    )
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      const data = doc.data() as Omit<Chat, 'id'>
      return {
        id: doc.id,
        ...data,
      }
    } else {
      return null
    }
  } catch (error) {
    console.error("Erro ao verificar se o chat existe:", error)
    return null
  }
}

export const listChatsByUserId = (
  userId: number,
  callback: (chats: Chat[]) => void,
  errorCallback: (error: unknown) => void
) => {
  try {
    const chatRef = collection(db, "chats")
    const q1 = query(chatRef, where("user1.id", "==", userId))
    const q2 = query(chatRef, where("user2.id", "==", userId))

    let chatsFromQ1: Chat[] = [];
    let chatsFromQ2: Chat[] = [];

    const unsubscribe = [
      onSnapshot(
        q1,
        (snapshot) => {
          chatsFromQ1 = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Chat, "id">),
          }));

          const uniqueChats = [...chatsFromQ1, ...chatsFromQ2].filter(
            (chat, index, self) => index === self.findIndex((c) => c.id === chat.id)
          );

          callback(uniqueChats);
        },
        (error) => errorCallback(error)
      ),
      onSnapshot(
        q2,
        (snapshot) => {
          chatsFromQ2 = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Chat, "id">),
          }));

          const uniqueChats = [...chatsFromQ1, ...chatsFromQ2].filter(
            (chat, index, self) => index === self.findIndex((c) => c.id === chat.id)
          );

          callback(uniqueChats);
        },
        (error) => errorCallback(error)
      ),
    ];

    return () => unsubscribe.forEach((unsub) => unsub && unsub())
  } catch (error) {
    console.error("Erro ao listar chats por usuário:", error)
    errorCallback(error)
  }
}


export const getChatById = async (chatId: string): Promise<Chat | null> => {
  try {
    const chatRef = doc(db, "chats", chatId)
    const chatDoc = await getDoc(chatRef)
    if (chatDoc.exists()) {
      const data = chatDoc.data() as Omit<Chat, 'id'>
      return { id: chatDoc.id, ...data }
    } else {
      console.warn("Chat não encontrado para o ID:", chatId)
      return null
    }
  } catch (error) {
    console.error("Erro ao buscar chat por ID:", error)
    return null
  }
}

export const listenToMessages = (
  roomId: string,
  onMessagesUpdate: (messages: Message[]) => void,
  onError: (error: Error) => void
): (() => void) => {
  try {
    const messagesRef = collection(db, "chats", roomId, "messages")
    const q = query(messagesRef, orderBy("timestamp", "asc"))
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messages: Message[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as Message[]
        onMessagesUpdate(messages)
      },
      (error) => {
        console.error("Erro ao escutar mensagens:", error)
        onError(error)
      }
    )
    return unsubscribe
  } catch (error) {
    console.error("Erro ao configurar listener de mensagens:", error)
    throw error
  }
}

export const updateUserInChats = async(user: ChatProfile): Promise<void> => {

  const chatsRef = collection(db, 'chats');
  const querySnapshot = await getDocs(chatsRef);
  
  querySnapshot.forEach(async (chatDoc) => {
    const chatData = chatDoc.data() as Chat;
    
    const isUser1 = chatData.user1.id === user.id;
    const isUser2 = chatData.user2.id === user.id;

    if (isUser1 || isUser2) {
      const chatRef = doc(db, 'chats', chatDoc.id);
      
      const updateData: Partial<Chat> = {};
      if (isUser1) {
        updateData.user1 = {
          avatar: user.avatar,
          id: user.id,
          nickname: user.nickname,
        };
      }
      if (isUser2) {
        updateData.user2 = {
          avatar: user.avatar,
          id: user.id,
          nickname: user.nickname,
        };
      }
      await updateDoc(chatRef, updateData);
      console.log(`Chat ${chatDoc.id} atualizado com sucesso!`);
    }
  })
  
}