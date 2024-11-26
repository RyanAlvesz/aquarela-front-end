import ReturnButton from "@/components/ui/buttons/ReturnButton"
import ItemModal from "@/components/ui/feed/ItemModal";
import Popover, { PopoverContent, PopoverTrigger } from "@/components/ui/utils/Popover";
import optionsSVG from "$/public/images/svg/options-white.svg"
import Image from "next/image";
import React from "react"
import { DetailedProduct, DetailedPublication } from "@/types";

interface MobilePublicationHeaderProps {
    onFavorite: () => Promise<boolean>
    item: DetailedPublication | DetailedProduct
    createFolder: (v: boolean) => void
}

const MobilePublicationHeader: React.FC<MobilePublicationHeaderProps> = ({ onFavorite, item, createFolder }) => {
    return (
        <nav className="bg-blue-1 w-full flex justify-between items-center p-4 md:hidden">
            <ReturnButton color="white" width={6} />
            {item.nome.length <= 15 && (
                <h1 className="text-white text-xl font-medium">{item.nome}</h1>
            )}
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        className="w-[6vh] h-[6vh] flex items-center justify-center"
                    >
                        <Image
                            alt="Opções"
                            src={optionsSVG}
                            width={100}
                            height={100}
                            className="w-[55%] h-auto"
                        />
                    </button>
                </PopoverTrigger>
                <PopoverContent>
                    <ItemModal
                        createFolder={createFolder}
                        item={item}
                        onFavorite={onFavorite}
                    />
                </PopoverContent>
            </Popover>
        </nav>
    )
}

export default MobilePublicationHeader