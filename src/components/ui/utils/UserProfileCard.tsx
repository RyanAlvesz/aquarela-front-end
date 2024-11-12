import { ProfileUser } from "@/types"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import standardProfile from "$/public/images/paintings/standard-profile-picture.jpg";
import darkBlueCoinSVG from "$/public/images/svg/dark-blue-coin.svg";
import starSVG from "$/public/images/svg/star.svg";
import ToolTip from "./ToolTip";
import { fetchWrapper } from "@/lib/api/fetch";

interface UserProfileCardProps {
    user: ProfileUser
    currentUser: boolean
    currentUserId: number
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({user, currentUser, currentUserId}) => {
    
    const [isFollowing, setIsFollowing] = useState<boolean>(user.esta_seguindo as boolean)       

    const handleFollow = async() => {
        setIsFollowing(!isFollowing)
        
        const url = 'v1/aquarela/follower/user'
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_seguidor: currentUserId,
                id_seguindo: user.id 
            })
        }        
        const resp = await fetchWrapper(url, options)
        
    }
    
    useEffect(() => {
    })

    const handleMessage = () => {}
    
    return (
        <div className="flex flex-col items-center justify-center w-full px-8">
            <Image 
                src={user.foto_usuario? user.foto_usuario : standardProfile}
                alt={user.nome}
                width={200}
                height={200}
                priority
                className="h-[14vh] w-[14vh] shadow-feed-item object-cover rounded-full mb-1"
            />
            <div className="flex gap-1 mb-[2px]">
                <h1 className="font-bold text-body-mobile text-blue-1"> {user.nome} </h1>
                {user.disponibilidade === true && (
                    <ToolTip message="Artista disponível">
                        <Image 
                            alt="Moeda"
                            src={darkBlueCoinSVG}
                            width={100}
                            height={100}
                            className="h-6 w-fit"
                        />
                    </ToolTip>
                )}
                {user.avaliacao && (
                    <ToolTip message={`${user.avaliacao} ${Math.ceil(user.avaliacao) < 1? 'estrela' : 'estrelas'}`}>
                        <div className="relative">
                            <Image 
                                alt="Estrelas"
                                src={starSVG}
                                width={100}
                                height={100}
                                className="h-6 w-fit"
                            />
                            <span className="absolute text-white text-[10px] font-medium top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{Math.ceil(user.avaliacao)}</span>
                        </div>
                    </ToolTip>
                )}
            </div>
            <p className="text-blue-2 text-sm mb-3"> {`@${user.nome_usuario}`} </p>
            <div className={`text-blue-3 flex gap-2 items-center justify-center text-sm ${currentUser? 'mb-5': 'mb-3'}`}>
                {`${user.seguidores} ${user.seguidores == 1? 'seguidor' : 'seguidores'}`} 
                <div className="w-1 h-1 rounded-full bg-blue-3" />
                {`${user.seguindo} seguindo`}
                <div className="w-1 h-1 rounded-full bg-blue-3" />
                {`${user.qnt_publicacoes} ${user.qnt_publicacoes == 1? 'publicação' : 'publicações'}`}
            </div>
            {!currentUser && (
                <div className="flex items-center justify-center gap-2 mb-3">
                    <button 
                        className={`w-[40vw] rounded-md py-2 font-medium text-sm flex items-center justify-center fade-animation ${isFollowing == false? 'bg-blue-1/90' : 'bg-blue-1'} text-white`}
                        onClick={handleFollow}
                    >
                        {isFollowing == false? 'Seguir' : 'Seguindo'}
                    </button>
                    {user.disponibilidade === true && (
                        <button 
                            className={`w-[40vw] rounded-md py-2 font-medium text-sm flex items-center justify-center fade-animation bg-blue-5 text-blue-1`}
                            onClick={handleMessage}    
                        >
                            Enviar mensagem
                        </button>
                    )}
                </div>
            )}
            {user.descricao && (
                <p className="text-sm text-blue-1 text-center mb-5"> {user.descricao} </p>
            )}
        </div>
    )
}

export default UserProfileCard