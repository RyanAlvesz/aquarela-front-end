import { Timestamp } from "firebase/firestore"
import { DateTime } from 'luxon'
import React, { useEffect, useState } from "react"

interface ChatTextProps {
    text: string
    currentUser: boolean
    timestamp: Timestamp
}

const ChatText: React.FC<ChatTextProps> = ({ text, currentUser, timestamp }) => {

    const [messageTime, setMessageTime] = useState<string>('Agora')

    const setMessage = (timestamp: Timestamp): string => {

        const messageDate = DateTime.fromJSDate(timestamp.toDate());
        const time = messageDate.toFormat('HH:mm');
        return String(time);
    
    }

    useEffect(() => {
        if(timestamp){
            const time = setMessage(timestamp)
            setMessageTime(time)
        }
    }, [timestamp])

    return (
        <div className={`grid items-end gap-1 max-w-[40vw] ${currentUser ? 'justify-self-end' : 'justify-self-start'}`}>
            <div className={`w-fit px-4 py-2 rounded-md shadow-md ${currentUser ? 'bg-blue-7 text-blue-1' : 'bg-blue-2 text-white'}`}>
                <p className={`h-fit text-lg`}> {text} </p>
            </div>
            <span className={`select-none w-full text-blue-1 text-end text-sm flex ${currentUser ? 'justify-end' : 'justify-start'}`}> {messageTime} </span>
        </div>
    )
}

export default ChatText