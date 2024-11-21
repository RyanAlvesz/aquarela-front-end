import { Folder as IFolder } from "@/types"

import folderSVG from "$/public/images/svg/folder.svg";
import plusSVG from "$/public/images/svg/plus.svg";
import icon from "$/public/images/logo/icon.png";
import Image from "next/image";

interface FolderProps {
    folder?: IFolder
    createButton?: boolean
    onClick?: (folder?: IFolder) => void
}

const Folder: React.FC<FolderProps> = ({folder, createButton, onClick}) => {
        
    return (
        <button 
            className="flex flex-col items-center"
            onClick={() => onClick?.(folder)}
        >
            <div className="relative w-full h-fit -m-2">
                <Image 
                    alt="Pasta"
                    src={folderSVG}
                    className="w-max"
                    width={100}
                    height={100}
                />
                <Image 
                        alt="Pasta"
                        src={createButton? plusSVG : icon}
                        width={100}
                        height={100}
                        className="w-1/3 h-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
            </div>
            <p className="font-medium text-center text-blue-1 md:font-bold text-sm">{createButton? 'Criar pasta' : folder?.nome}</p>
        </button>
    )
} 

export default Folder