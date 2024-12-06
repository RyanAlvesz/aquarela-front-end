import { fetchWrapper } from "@/lib/api/fetch";
import { resetCategories } from "@/store/categoriesSlice";
import { resetInputs } from "@/store/inputSlice";
import { resetProfile } from "@/store/profileSlice";
import { persistor } from "@/store/redux-provider";
import { resetRememberMe } from "@/store/rememberMeSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { resetUser } from "@/store/userSlice";
import { confirmAlert } from "@/types/alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface respProps {
    status: boolean,
    status_code: number,
    message: string
}

const ConfigModal: React.FC = () => {

    const user = useAppSelector((state: RootState) => state.user)
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleDeleteAccount = async () => {
        const alertResp: boolean = await confirmAlert(
            {
                title: 'Tem certeza que deseja excluir sua conta?',
                icon: 'warning',
                description: 'Você perderá todos as suas publicações e seguidores',
                confirmBtn: 'Excluir',
                declineBtn: 'Cancelar'
            }
        )
        if (alertResp) {

            const url: string = 'v1/aquarela/delete/user/' + user.id

            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            const resp = await fetchWrapper<respProps>(url, options)

            if (resp.status) {
                logout()
            }

        }
    }

    const logout = () => {
        router.push('/')
        setTimeout(() => {
            persistor.purge().then(() => {
                dispatch(resetUser())
                dispatch(resetRememberMe())
                dispatch(resetInputs())
                dispatch(resetCategories())
                dispatch(resetProfile())
            })
        }, 2500)
    }

    const handleExit = async () => {

        const alertResp: boolean = await confirmAlert(
            {
                title: 'Tem certeza que realmente deseja sair?',
                icon: 'warning',
                description: 'Você terá que realizar login novamente',
                confirmBtn: 'Sair',
                declineBtn: 'Cancelar'
            }
        )

        if (alertResp) {
            logout()
        }

    }

    return (
        <div className="w-[15vw] z-40 relative h-fit py-4 px-2 animate-fade-down animate-duration-1000 animate-ease-in-out flex flex-col gap-6 bg-blue-8 mr-2 mt-4 rounded-xl shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] right-0">
            <div className="flex flex-col gap-2">
                <h3 className="text-xs px-2 2xl:text-lg">Ajustes</h3>
                <div className="flex flex-col gap-1 items-start text-start font-medium 2xl:text-xl">
                    <Link href={'/home/config'} className="hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md"> Configurações </Link>
                    <Link href={'/home/config/profile'} className="hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md"> Editar perfil </Link>
                    <Link href={'/home/config/preferences'} className="hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md"> Preferências </Link>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-xs px-2 2xl:text-lg">Mais opções</h3>
                <div className="flex flex-col gap-1 items-start font-bold 2xl:text-xl">
                    <button onClick={handleDeleteAccount} className="text-blue-2 text-start hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md">Excluir conta</button>
                    <button onClick={handleExit} className="text-blue-1 text-start hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md">Sair</button>
                </div>
            </div>
        </div>
    )
}

export default ConfigModal;