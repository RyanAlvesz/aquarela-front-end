import React from "react"
import Avatar from "../buttons/Avatar"
import { BaseUser } from "@/types"

interface CommentBoxProps {
    user: BaseUser
    comment: string
    handleSubmitComment: () => void
    setComment: (comment: string) => void
}

const CommentBox: React.FC<CommentBoxProps> = ({user, comment, handleSubmitComment, setComment}) => {
    return (
        <div className="flex fixed bottom-0 left-0 right-0 p-4 md:px-3 bg-white gap-4 md:relative md:py-0">
            <Avatar nickname={user.nome_usuario} user={user} className="w-12 h-12 md:w-14 md:h-14" />
            <input
                type="text"
                placeholder="Adicionar um comentário"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmitComment()
                    }
                }}
                value={comment}
                onChange={(e) => setComment(e.target.value)} 
                className="grow p-2 h-12 md:h-14 px-3 text-[100%] placeholder:text-[100%] md:text-[110%] md:placeholder:text-[110%] rounded-md focus:outline focus:!outline-1 outline-blue-2 bg-blue-6/50 focus:bg-blue-6/70 text-blue-2 placeholder:text-blue-2"    
            />
        </div>
    )
}

export default CommentBox