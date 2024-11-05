'use client'

import homeSVG from "$/public/images/svg/home.svg";
import historySVG from "$/public/images/svg/history.svg";
import chatSVG from "$/public/images/svg/chat.svg";

import React from "react";
import { RootState, useAppSelector } from "@/store/store";
import CreatePublicationButton from "../buttons/CreatePublicationButton";
import MobileNavBarButton from "../buttons/MobileNavBarButton";
import Avatar from "../buttons/Avatar";

const MobileNavigation: React.FC = () => {

    const user = useAppSelector((state: RootState) => state.user)
    
    return (
        <nav className="flex items-center justify-between h-[8vh] py-2 px-6 fixed bottom-0 right-0 left-0 bg-white md:hidden">
            <MobileNavBarButton
                alt="Página inicial"
                image={homeSVG}
                link={'/home/feed'}
            />
            <MobileNavBarButton
                alt="Histórico"
                image={historySVG}
                link={'/home/history'}
            />
            <CreatePublicationButton />
            <MobileNavBarButton
                alt="Conversa"
                image={chatSVG}
                link={'/home/chat'}
            />
            <Avatar
                nickname={user.nome_usuario}
                user={user}
                className="h-[calc(7vh-0.5rem)] w-[calc(7vh-0.5rem)]"
            />
        </nav>
    )
}

export default MobileNavigation