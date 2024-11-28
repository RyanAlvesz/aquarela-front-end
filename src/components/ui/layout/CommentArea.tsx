import { BaseUser, Comment } from "@/types"
import React from "react"
import CommentCard from "../text/CommentCard"

interface CommentAreaProps {
    comments: Comment[]
    currentUser: BaseUser
    itemOwner: BaseUser
    refreshComments: () => void
    className?: string
}

const CommentArea: React.FC<CommentAreaProps> = ({comments, currentUser, itemOwner, refreshComments, className}) => {
    
    const commentCount  = comments.length
    
    return (
        <div className={`border-t border-b border-blue-3/30 pb-[calc(6vh+2rem+1.5rem)] flex flex-col items-center md:pb-0 md:border-b-2 md:border-t-2 md:border-blue-2/60 md:grow ${className}`}>
            <p className="font-medium text-blue-1 text-base w-full px-3 pt-5 pb-1 md:bg-white">{commentCount} {commentCount == 1? 'comentário' : 'comentários'}</p>
            <div className="md:h-[50vh] flex flex-col justify-start md:overflow-y-scroll w-full">
                {commentCount  > 0 ? (
                    comments.map((comment) => (
                        <CommentCard refreshComments={refreshComments} key={comment.id_comentario} itemOwner={itemOwner} currentUser={currentUser} comment={comment}/>
                    ))
                ) : (
                    <p className="text-center text-blue-1 font-medium md:text-xl px-8 mt-5">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
                )}
            </div>
        </div>
    )
}

export default CommentArea