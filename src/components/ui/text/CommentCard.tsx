'use client'

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BaseUser, Comment } from "@/types"
import Popover, { PopoverContent, PopoverTrigger } from "../utils/Popover"
import optionsSVG from "$/public/images/svg/options.svg"
import CommentModal from "../utils/CommentModal"
import { fetchWrapper } from "@/lib/api/fetch"
import alert from "@/types/alert"

interface CommentCardProps {
    comment: Comment
    currentUser: BaseUser
    itemOwner: BaseUser
    refreshComments: () => void
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, currentUser, itemOwner, refreshComments }) => {

    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [isOptionsOpen, setOptionsOpen] = useState<boolean>(false)
    const [commentMessage, setCommentMessage] = useState<string>(comment.mensagem)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const isCommentOwner = currentUser.id === comment.id_usuario
    const isItemOwner = currentUser.id === itemOwner.id

    const handleEdit = () => {
        setIsEditing(v => !v)
    }

    const handleSubmitEdit = async () => {

        if (!isEditing) return

        if (commentMessage.trim() === "") {
            alert({ icon: 'error', title: 'Comentário vazio' })
            return
        }

        if (commentMessage !== comment.mensagem) {
            const url: string = 'v1/aquarela/comment/' + comment.id_comentario;

            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mensagem: commentMessage,
                    id_usuario: comment.id_usuario,
                    id_resposta: comment.id_resposta
                })
            };

            const resp = await fetchWrapper(url, options);

            if (resp) {
                refreshComments()
            }

        }

        setIsEditing(false)
    }

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing])

    return (
        <div
            className="flex justify-center gap-2 w-full mt-4 hover:bg-blue-7/60 px-3 py-2 rounded-md relative"
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => {
                if (!isOptionsOpen) setIsHovered(false);
            }}
        >
            <Link
                href={'/home/profile/' + comment.nome_usuario}
                className="shrink-0 h-12 w-12 rounded-full flex items-center justify-center aspect-square overflow-hidden"
            >
                <Image
                    alt={comment.nome_usuario}
                    src={comment.foto_usuario}
                    width={250}
                    height={250}
                    priority
                    className="w-full h-full object-cover"
                />
            </Link>
            <div className="flex flex-col text-blue-1 grow">
                <Link href={'/home/profile/' + comment.nome_usuario} className="font-medium w-fit">
                    {comment.nome_usuario}
                </Link>
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={commentMessage}
                        onChange={(e) => setCommentMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                                handleSubmitEdit()
                            }
                        }}
                        onBlur={handleSubmitEdit}
                        className="focus:underline underline-offset-4 bg-transparent"
                    />
                ) : (
                    <p className="bg-transparent">
                        {commentMessage}
                    </p>
                )}
            </div>
            {(isHovered && (isCommentOwner || isItemOwner)) && (
                <div className="absolute inset-0 flex justify-end px-3 py-2 items-start pointer-events-none">
                    <Popover open={isOptionsOpen} onOpenChange={(open) => {
                        setOptionsOpen(open);
                        if (!open) {
                            setIsHovered(false)
                        }
                    }}>
                        <PopoverTrigger asChild onClick={() => setOptionsOpen((v) => !v)}>
                            <button
                                className="w-5 h-5 flex items-center justify-center pointer-events-auto"
                            >
                                <Image
                                    alt="Opções"
                                    src={optionsSVG}
                                    width={100}
                                    height={100}
                                    className="w-full h-auto"
                                />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <CommentModal refreshComments={refreshComments} comment={comment} edit={isCommentOwner ? handleEdit : undefined} />
                        </PopoverContent>
                    </Popover>
                </div>
            )}
        </div>
    )
}

export default CommentCard