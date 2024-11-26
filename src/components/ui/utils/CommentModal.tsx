import { fetchWrapper } from "@/lib/api/fetch"
import { Comment } from "@/types"
import React from "react"

interface CommentModalProps {
    edit?: () => void
    comment: Comment
    refreshComments: () => void
}

interface DeleteProps{
    status: boolean
    status_code: number
    message: string
}

const CommentModal: React.FC<CommentModalProps> = ({edit, comment, refreshComments}) => {

    const handleDelete = async() => {

        const url: string = 'v1/aquarela/delete/comment/' + comment.id_comentario

        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          }
        }
  
        const resp = await fetchWrapper<DeleteProps>(url, options)
        
        if(resp.status){
            refreshComments()
        }

    }

    return (
        <div className="w-[40vw] md:w-[10vw] z-40 relative h-fit py-4 px-2 animate-fade-down animate-duration-1000 animate-ease-in-out flex flex-col gap-6 bg-blue-8 rounded-xl shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] right-0">
            <div className="flex flex-col gap-1 items-start text-start text-blue-1 font-medium">
                {edit && (
                    <button onClick={edit} className="text-start hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md">Editar</button>
                )}
                <button onClick={handleDelete} className="text-start text-blue-2 hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md">Apagar</button>
            </div>
        </div>
    )
}

export default CommentModal