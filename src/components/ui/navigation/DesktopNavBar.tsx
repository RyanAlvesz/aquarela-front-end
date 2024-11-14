'use client'

import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import pallet from "$/public/images/logo/icon.png";
import bagSVG from "$/public/images/svg/bag.svg";
import arrowSVG from "$/public/images/svg/arrow.svg";
import SearchBar from "../forms/SearchBar";
import Avatar from "../buttons/Avatar";
import { RootState, useAppSelector } from "@/store/store";
import DesktopNavBarLink from "./DesktopNavBarLink";
import ToolTip from "../utils/ToolTip";
import ConfigModal from "../utils/ConfigModal";


const DesktopNavBar: React.FC = () => {

    const user = useAppSelector((state: RootState) => state.user)
    const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false)
    const handleConfigModal = () => {
        setIsConfigModalOpen(prev => !prev)
    }

    return(
        <nav className="hidden z-50 h-[10vh] md:flex items-center justify-between p-[2.5vh] gap-6 fixed top-0 left-0 right-0 bg-white">
            <Link
                href={'/home/feed'}
                className="h-full shrink-0"
            >
                <Image 
                    alt="Aquarela"
                    src={pallet}
                    width={100}
                    height={100}
                    className="h-full w-auto"
                />
            </Link>
            <DesktopNavBarLink
                text="Início"
                link={'/home/feed'}
            />
            <DesktopNavBarLink
                text="Postar"
                link={'/create/'}
            />
            <DesktopNavBarLink
                text="Histórico"
                link={'/home/history'}
            />
            <DesktopNavBarLink
                text="Mensagens"
                link={'/home/chat'}
            />
            <SearchBar />
            <Link
                href={'/'}
                className="h-full w-fit shrink-0"
            >
                <Image
                    alt="Sacola"
                    src={bagSVG}
                    className="h-full w-fit"
                    height={100}
                />
            </Link>
            <div className="flex items-center justify-center gap-1 h-full relative">
                <Avatar
                    nickname={user.nome_usuario}
                    user={user}
                    className="h-full"
                />
                <ToolTip message="Configurações e mais opções">
                    <button
                        className="-rotate-90 shrink-0 h-full w-fit"
                        onClick={handleConfigModal}
                    >
                        <Image
                            alt="Seta de opções"
                            width={100}
                            height={100}
                            src={arrowSVG}
                        />
                    </button>
                </ToolTip>
                {isConfigModalOpen && (
                    <ConfigModal />
                )}
            </div>
        </nav>
    )
}

export default DesktopNavBar