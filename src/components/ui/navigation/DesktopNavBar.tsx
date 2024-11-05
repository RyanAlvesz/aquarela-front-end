'use client'

import Image from "next/image"
import Link from "next/link"
import React from "react"
import pallet from "$/public/images/logo/icon.png";
import bagSVG from "$/public/images/svg/bag.svg";
import arrowSVG from "$/public/images/svg/arrow.svg";
import SearchBar from "../forms/SearchBar";
import Avatar from "../buttons/Avatar";
import { RootState, useAppSelector } from "@/store/store";
import DesktopNavBarLink from "./DesktopNavBarLink";
import ToolTip from "../utils/ToolTip";


const DesktopNavBar: React.FC = () => {

    const user = useAppSelector((state: RootState) => state.user)

    return(
        <nav className="hidden h-[10vh] md:flex items-center justify-between shadow-[0px_4px_8px_rgba(184,206,212,0.25)] p-[2.5vh] gap-6 fixed top-0 left-0 right-0 bg-white">
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
            <div className="flex items-center justify-center gap-1 h-full">
                <Avatar
                    nickname={user.nome_usuario}
                    user={user}
                    className="h-full"
                />
                <ToolTip message="Mais opções">
                    <button
                        className="-rotate-90 shrink-0 h-full w-fit"
                    >
                        <Image
                            alt="Seta de opções"
                            width={100}
                            height={100}
                            src={arrowSVG}
                        />
                    </button>
                </ToolTip>
            </div>
        </nav>
    )
}

export default DesktopNavBar