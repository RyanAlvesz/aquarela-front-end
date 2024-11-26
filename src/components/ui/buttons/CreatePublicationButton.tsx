'use client'

import Image from "next/image"
import addSVG from "$/public/images/svg/add-button.svg";
import frameSVG from "$/public/images/svg/frame.svg";
import coinSVG from "$/public/images/svg/coin.svg";
import { useEffect, useRef, useState } from "react";
import CreatePublicationChoiceButton from "./CreatePublicationChoiceButton";

const CreatePublicationButton = () => {

    const menuRef = useRef<HTMLDivElement>(null)

    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const toggleMenu = () => {
        setIsMenuVisible(prev => !prev)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={toggleMenu} className="shrink-0 h-[calc(8vh+1rem)] -translate-y-4 relative">
                <div className="h-full w-full absolute inset-0 bg-white rounded-full"></div>
                <Image
                    alt="Criar publicação"
                    src={addSVG}
                    className="h-full w-full relative z-50"
                />
            </button>

            {isMenuVisible && (

                <div className={`absolute left-1/2 right-1/2 -translate-x-1/2 fade-up-animation ease-linear flex items-center justify-center gap-6
                                    ${isMenuVisible ? "bottom-[calc(8vh+3rem)]" : "-bottom-[14vh]"}
                                `}>
                    <CreatePublicationChoiceButton
                        link={'/home/create/publication'}
                        alt="Quadro"
                        image={frameSVG}
                        text="Criar publicação"
                    />
                    <CreatePublicationChoiceButton
                        link={'/home/create/procuct'}
                        alt="Moeda"
                        image={coinSVG}
                        text="Criar produto"
                    />
                </div>

            )}

        </div>
    )
}

export default CreatePublicationButton