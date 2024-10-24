import Image from "next/image"
import Link from "next/link"

import homeSVG from "$/public/images/svg/home.svg";
import historySVG from "$/public/images/svg/history.svg";
import chatSVG from "$/public/images/svg/chat.svg";
import React from "react";
import { User } from "@/types";

interface mobileNavigationProps {
    user: User
}

const MobileNavigation: React.FC<mobileNavigationProps> = ({user}) => {
    return (
        <div className="flex items-center justify-between h-[8vh] fixed bottom-0 right-0 left-0 bg-white">
            <Link href={'/home/feed'}>
                <Image 
                    alt="Página principal" 
                    src={homeSVG} 
                    className="h-8"
                />
            </Link>
            <Link href={'/home/history'}>
                <Image 
                    alt="Histórico" 
                    src={historySVG} 
                    className="h-8"
                />
            </Link>
            <Link href={'/home/chat'}>
                <Image 
                    alt="Conversa" 
                    src={chatSVG} 
                    className="h-8"
                />
            </Link>
            <Link href={'/home/profile'}>
                <Image 
                    alt={user.nome} 
                    src={user.foto_usuario? user.foto_usuario : chatSVG} 
                    className="h-8"
                />
            </Link>
        </div>
    )
}

export default MobileNavigation