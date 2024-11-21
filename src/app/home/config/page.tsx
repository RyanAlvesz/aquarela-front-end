'use client'

import GradientButton from "@/components/ui/buttons/GradientButton"
import ConfigTitle from "@/components/ui/buttons/ConfigTitle"
import standardProfile from "$/public/images/paintings/standard-profile-picture.png";
import arrowSVG from "$/public/images/svg/arrow.svg";
import Image from "next/image"
import Link from "next/link"
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import ConfigOptions from "@/components/ui/buttons/ConfigOpitions";
import { useEffect, useState } from "react";
import { persistor } from "@/store/redux-provider";
import { resetUser } from "@/store/userSlice";
import { resetRememberMe } from "@/store/rememberMeSlice";
import { resetInputs } from "@/store/inputSlice";
import { resetCategories } from "@/store/categoriesSlice";
import { resetProfile } from "@/store/profileSlice";
import { useRouter } from "next/navigation";
import { confirmAlert } from "@/types/alert";
import { fetchWrapper } from "@/lib/api/fetch";

interface respProps {
  status: boolean,
  status_code: number,
  message: string
}

const Config = () => {

  const user = useAppSelector((state: RootState) => state.user)
  const [alt, setAlt] = useState('')
  const [userName, setUserName] = useState('')

  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    setAlt(user.nome)
    setUserName(user.nome)
  }, [user])

  const logout = () => {
    persistor.purge().then(() => {
      dispatch(resetUser())
      dispatch(resetRememberMe())
      dispatch(resetInputs())
      dispatch(resetCategories())
      dispatch(resetProfile())
      router.push('/')
    })
  }

  const exit = async () => {
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

  const deleteAccount = async () => {
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

  return (
    <main className="bg-blue-7 h-screen flex justify-center p-4 md:pt-8 md:bg-transparent md:h-auto md:grow">
      <div className="flex flex-col gap-6 md:gap-12 w-full md:w-1/3">
        <ConfigTitle text="Configurações" returnButton />
        <div className="flex flex-col items-center justify-between grow md:grow-0 md:gap-20">
          <div className="flex flex-col items-center justify-center w-full gap-6 md:gap-10">
            <Link href={'/home/config/profile'} className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Image
                  alt={alt}
                  src={user.foto_usuario ? user.foto_usuario : standardProfile}
                  width={200}
                  height={200}
                  className="rounded-full h-[10vh] w-[10vh] md:h-[4.5rem] md:w-[4.5rem] object-cover"
                />
                <div className="text-blue-1 font-medium flex flex-col">
                  <h2 className="text-base md:text-2xl">{userName}</h2>
                  <span className="text-sm md:text-xl">Editar perfil</span>
                </div>
              </div>
              <button className="h-full">
                <Image
                  alt='Seta para direita'
                  src={arrowSVG}
                  width={50}
                  height={50}
                  className="h-10 w-auto rotate-180"
                />
              </button>
            </Link>
            <ul className="w-full">
              <li>
                <ConfigOptions text="Gerenciar Conta" url="/home/config/acount" />
              </li>
              <li>
                <ConfigOptions text="Endereços" url="/home/config/address" />
              </li>
              <li>
                <ConfigOptions text="Preferências" url="/home/config/preferences" />
              </li>
              <li>
                <ConfigOptions text="Ajustar feed inicial" url="/home/config/feed" />
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <GradientButton onClick={exit} className="w-full h-12 [&>p]:!text-xl" direction="right" label="Sair" primaryColor='blue-1' secundaryColor='blue-2' />
            <GradientButton onClick={deleteAccount} className="w-full h-12 [&>p]:!text-xl" direction="right" label="Excluir conta" primaryColor='blue-4' secundaryColor='blue-3' />
          </div>
        </div>
      </div>
    </main>
  )

}

export default Config
