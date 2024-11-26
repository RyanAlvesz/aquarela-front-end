import React from "react"
import ToolTip from "./ToolTip"
import Link from "next/link"
import Avatar from "../buttons/Avatar"
import Image from "next/image"
import { DetailedProduct, DetailedPublication } from "@/types"
import eyeSVG from '$/public/images/svg/eye.svg'
import editSVG from '$/public/images/svg/edit.svg'

interface UserDetailsProps {
    publication: DetailedPublication | DetailedProduct
    publicationOwner: boolean
    isFollowing: boolean
    follow: () => void
    edit: () => void
}

const UserDetails: React.FC<UserDetailsProps> = ({publication, publicationOwner, isFollowing, follow, edit}) => {
    return (
        <div className="flex justify-between items-center p-3 md:py-0">
            <div className="flex items-center justify-center gap-2">
                <Avatar className="h-14 w-14 md:h-[6.5vh] md:w-[6.5vh]" nickname={`${publication.dono_publicacao.nome_usuario}`} user={publication.dono_publicacao} />
                <div className="flex flex-col text-base md:gap-1">
                    <h2 className="font-medium text-blue-1 translate-y-1 md:text-xl">{publication.dono_publicacao.nome}</h2>
                    <Link
                        href={'/home/profile/' + publication.dono_publicacao.nome_usuario}
                        className="flex items-center justify-center h-fit w-fit"
                    >
                        <span className="text-blue-2 -translate-y-1 md:text-lg">{`@${publication.dono_publicacao.nome_usuario}`}</span>
                    </Link>
                </div>
            </div>
            {publicationOwner ? (
                <div className="flex gap-3 items-center justify-center">
                    <ToolTip message="Visualizações">
                        <div className="flex items-center justify-center text-xl gap-1 font-medium text-blue-1">
                            {publication.quantidade_visualizacoes}
                            <Image
                                alt="Visualizar"
                                src={eyeSVG}
                                width={100}
                                height={100}
                                className="h-8 w-8"
                            />
                        </div>
                    </ToolTip>
                    <ToolTip message="Editar">
                        <div 
                            className="flex items-center justify-center text-xl gap-1 font-medium text-blue-1"
                            onClick={edit}
                        >
                            <Image
                                alt="Editar"
                                src={editSVG}
                                width={100}
                                height={100}
                                className="h-7 w-7"
                            />
                        </div>
                    </ToolTip>
                </div>
            ) : (
                <button
                    className={`w-[35vw] md:w-[10vw] rounded-md py-2 font-medium text-sm md:text-base flex items-center justify-center fade-animation ${isFollowing === false ? 'bg-blue-1/90' : 'bg-blue-1'} text-white`}
                    onClick={follow}
                >
                    {isFollowing === false ? 'Seguir' : 'Seguindo'}
                </button>
            )}
        </div>            
    )
}

export default UserDetails