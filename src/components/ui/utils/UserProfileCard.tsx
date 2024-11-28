import { ProfileUser } from "@/types"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import standardProfile from "$/public/images/paintings/standard-profile-picture.png";
import darkBlueCoinSVG from "$/public/images/svg/dark-blue-coin.svg";
import starSVG from "$/public/images/svg/star.svg";
import ToolTip from "./ToolTip";
import { fetchWrapper } from "@/lib/api/fetch";
import { usePathname } from "next/navigation";
import alert from "@/types/alert";

interface UserProfileCardProps {
    user: ProfileUser
    currentUser: boolean
    currentUserId: number
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({user, currentUser, currentUserId}) => {
    
    const [isFollowing, setIsFollowing] = useState<boolean>(Boolean(Number(user.esta_seguindo)))   
    const [followersCount, setFollowersCount] = useState<number>(Number(user.seguidores))   

    const pathname = usePathname()

    const handleFollow = async() => {
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
        
        try {
            
            interface getResp {
                status_code: number
            }
            
            const resp = await fetchWrapper<getResp>(url, options)   
            if(resp.status_code == 201){
                setIsFollowing(prevState => !prevState)
                setFollowersCount((prevCount) => isFollowing ? prevCount - 1 : prevCount + 1)
            }

        } catch (error) {
            console.error(error)
        }   
    }
    
    useEffect(() => {
        setIsFollowing(Boolean(Number(user.esta_seguindo)))
    }, [user.esta_seguindo])

    const handleMessage = () => {}
    
    const handleShare = async () => {
        await navigator.clipboard.writeText('https://aquarela-front-end.vercel.app' + pathname)
        alert({
            icon: 'success',
            title: 'Perfil copiado para área de trasnferência'
        })
    }
    
    return (
        <div className="flex flex-col items-center justify-center w-full px-8">
            <Image 
                src={user.foto_usuario? user.foto_usuario : standardProfile}
                alt={user.nome}
                width={5000}
                height={5000}
                priority
                className="h-[14vh] w-[14vh] shadow-feed-item object-cover rounded-full mb-1 2xl:h-[10vh] 2xl:w-[10vh] 2xl:mb-3"
            />
            <div className="flex items-center gap-1 mb-[2px]">
                <h1 className="font-bold text-body-mobile text-blue-1 md:text-2xl 2xl:text-3xl"> {user.nome} </h1>
                {user.disponibilidade === true && (
                    <ToolTip message="Artista disponível">
                        <Image 
                            alt="Moeda"
                            src={darkBlueCoinSVG}
                            width={100}
                            height={100}
                            className="h-6 2xl:h-8 w-fit"
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
                                className="h-6 2xl:h-8 w-fit"
                            />
                            <span className="absolute select-none text-white text-[10px] font-medium top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 2xl:text-sm">{Math.ceil(user.avaliacao)}</span>
                        </div>
                    </ToolTip>
                )}
            </div>
            <p className="text-blue-2 text-sm mb-3 md:text-[18px]"> {`@${user.nome_usuario}`} </p>
            <div className={`text-blue-3 flex gap-2 items-center justify-center text-sm md:text-base md:font-medium ${currentUser? 'mb-5': 'mb-3'}`}>
                {`${followersCount} ${user.seguidores == 1? 'seguidor' : 'seguidores'}`} 
                <div className="w-1 h-1 rounded-full bg-blue-3" />
                {`${user.seguindo} seguindo`}
                <div className="w-1 h-1 rounded-full bg-blue-3" />
                {`${user.qnt_publicacoes} ${user.qnt_publicacoes == 1? 'publicação' : 'publicações'}`}
            </div>
            {!currentUser && (
                <div className="flex items-center justify-center gap-2 mb-5">
                    <button 
                        className={`w-[40vw] md:w-[10vw] 2xl:w-[6.5vw] rounded-md py-2 font-medium text-sm md:text-base flex items-center justify-center fade-animation ${isFollowing === false ? 'bg-blue-1/90' : 'bg-blue-1'} text-white`}
                        onClick={handleFollow}
                    >
                        {isFollowing === false? 'Seguir' : 'Seguindo'}
                    </button>
                    <button 
                        className={`w-[40vw] md:w-[10vw] 2xl:w-[6.5vw] rounded-md py-2 font-medium text-sm md:text-base flex items-center justify-center fade-animation bg-blue-5 text-blue-1`}
                        onClick={user.disponibilidade == true? handleMessage : handleShare}    
                    >
                        {user.disponibilidade == true? 'Enviar mensagem' : 'Compartilhar'} 
                    </button>
                </div>
            )}
            {user.descricao && (
                <p className="text-sm md:text-[18px] text-blue-1 text-center mb-5 md:mb-10"> {user.descricao} </p>
            )}
        </div>
    )
}

export default UserProfileCard