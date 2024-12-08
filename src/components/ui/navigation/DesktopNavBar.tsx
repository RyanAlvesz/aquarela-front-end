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
import ConfigModal from "../utils/ConfigModal";
import Popover, { PopoverContent, PopoverTrigger } from "../utils/Popover";
import DesktopPublicationButton from "../buttons/DesktopPublicationButton";


const DesktopNavBar: React.FC = () => {

    const user = useAppSelector((state: RootState) => state.user)

    return (
        <nav className="hidden z-20 h-[10vh] md:flex items-center justify-between p-[2.5vh] gap-6 fixed top-0 left-0 right-0 bg-white">
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
            <DesktopPublicationButton/>
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
            <div className="flex shrink-0 items-center justify-center gap-1 h-full relative">
                <Avatar
                    nickname={user.nome_usuario}
                    user={user}
                    className="h-full"
                />
                    <Popover placement="bottom-end">
                        <PopoverTrigger asChild>
                            <div
                                className={`shrink-0 h-full cursor-pointer w-auto [&>div]:h-full [&>div>div:first-child]:h-full [&[data-state='open']_img]:rotate-90`}
                            >
                                <ToolTip message="Configurações e mais opções">
                                        <Image
                                            alt="Seta de opções"
                                            width={100}
                                            height={100}
                                            src={arrowSVG}
                                            className="-rotate-90 w-auto h-full ease-linear duration-500"
                                        />
                                </ToolTip>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <ConfigModal />
                        </PopoverContent>
                    </Popover>
            </div>
        </nav>
    )
}

export default DesktopNavBar