import frameSVG from "$/public/images/svg/frame.svg";
import coinSVG from "$/public/images/svg/coin.svg";
import { useEffect, useRef, useState } from "react";
import CreatePublicationChoiceButton from "./CreatePublicationChoiceButton";

const DesktopPublicationButton = () => {
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
            <button onClick={toggleMenu} className="relative">
                <h2 className="font-medium text-base relative z-10 text-blue-1"> Postar </h2>
            </button>

            {isMenuVisible && (

                <div className={`absolute left-1/2 right-1/2 -translate-x-1/2 animate-fade-down duration-300 ease-linear grid grid-rows-2 items-center justify-center gap-2
                                    ${isMenuVisible ? "top-full mt-4 z-50" : "-top-[14vh] z-0"}
                                `}>
                    <CreatePublicationChoiceButton
                        link={'/home/create/publication'}
                        alt="Quadro"
                        image={frameSVG}
                        text="Publicação"
                    />
                    <CreatePublicationChoiceButton
                        link={'/home/create/product'}
                        alt="Moeda"
                        image={coinSVG}
                        text="Produto"
                    />
                </div>

            )}

        </div>
    )
}

export default DesktopPublicationButton;