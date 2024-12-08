'use client'

import { BaseUser } from "@/types"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import standardProfile from "$/public/images/paintings/standard-profile-picture.png";

interface ContactListModalProps {
    contactList: BaseUser[]
    handleSelect: (arg: BaseUser) => void
    loading: boolean
}

const ContactListModal: React.FC<ContactListModalProps> = ({ contactList, handleSelect, loading }) => {

    const [search, setSearch] = useState<string>('')
    const [users, setUsers] = useState<BaseUser[]>(contactList)

    useEffect(() => {
        if (!search.trim()) {
            setUsers(contactList)
        } else {
            const filteredUsers = contactList.filter(user =>
                user.nome.toLowerCase().includes(search.toLowerCase()) ||
                user.nome_usuario.toLowerCase().includes(search.toLowerCase()) ||
                user.descricao?.toLowerCase().includes(search.toLowerCase())
            )
            setUsers(filteredUsers)
        }
    }, [search])

    return (
        <div className="bg-blue-8 w-[25vw] z-40 relative h-fit py-6 px-4 flex flex-col gap-4 animate-fade-down animate-duration-1000 animate-ease-in-out rounded-xl shadow-[0_0_8px_0px_rgba(0,0,0,0.2)]">
            <h2 className="text-blue-1 text-3xl font-bold">Nova conversa</h2>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full text-blue-1 placeholder:text-blue-2 py-2 px-3 text-[120%] rounded-md shadow-inner border border-blue-2/50" placeholder="Pesquisar usuário" />
            <div className="flex flex-col max-h-[40vh] overflow-y-scroll">
                {loading ? (
                    <div className="flex items-center justify-center py-3 h-full">
                        <p className="text-blue-1 text-xl">Carregando...</p>
                    </div>
                ) : contactList.length > 0 ? (
                    <>
                        {users.map((user) => {
                            return (
                                <button
                                    type="button"
                                    key={user.id}
                                    onClick={() => handleSelect(user)}
                                    className="h-16 p-2 hover:bg-blue-2/20 rounded-lg flex items-center gap-2"
                                >
                                    <Image
                                        src={user.foto_usuario ? user.foto_usuario : standardProfile}
                                        alt={user.nome_usuario}
                                        width={100}
                                        height={100}
                                        className="rounded-full aspect-square h-full w-auto object-cover"
                                    />
                                    <div className="flex flex-col justify-center text-blue-2 items-start grow text-start">
                                        <h3 className="text-blue-1 text-lg font-medium">{user.nome}</h3>
                                        <p className="overflow-hidden whitespace-nowrap text-ellipsis block w-[calc(25vw-6.5rem)]">
                                            {user.descricao ? user.descricao : `@${user.nome_usuario}`}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </>
                ) : (
                    <div className="flex items-center justify-center py-3 h-full">
                        <p className="text-blue-1 text-xl">Nenhum usuário encontrado.</p>
                    </div>
                )}
            </div>
        </div >
    )
}

export default ContactListModal