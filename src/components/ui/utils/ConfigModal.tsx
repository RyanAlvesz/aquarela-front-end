import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ConfigModal: React.FC = () => {

    const router = useRouter()

    const handleDeleteAccount = () => {}
    const handleExit = () => {
        router.push('/')
    }

    return(
        <div className="w-[15vw] h-fit py-4 px-2 animate-fade-down animate-duration-1000 animate-ease-in-out flex flex-col gap-6 bg-white rounded-xl absolute top-full mt-4 shadow-[0_0_8px_0px_rgba(0,0,0,0.1)] right-0">
            <div className="flex flex-col gap-2">
                <h3 className="text-xs px-2">Ajustes</h3>
                <div className="flex flex-col gap-1 items-start text-start font-medium">
                    <Link href={'/home/config'} className="hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md"> Configurações </Link>
                    <Link href={'/home/config/profile'} className="hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md"> Editar perfil </Link>
                    <Link href={'/home/config/feed'} className="hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md"> Ajustar tela inicial </Link>
                    <Link href={'/home/config/preferences'} className="hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md"> Preferências </Link>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-xs px-2">Mais opções</h3>
                <div className="flex flex-col gap-1 items-start font-bold">
                    <button onClick={handleDeleteAccount} className="text-blue-2 text-start hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md">Excluir conta</button>
                    <button onClick={handleExit} className="text-blue-1 text-start hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md">Sair</button>
                </div>
            </div>
        </div>
    )
}

export default ConfigModal;