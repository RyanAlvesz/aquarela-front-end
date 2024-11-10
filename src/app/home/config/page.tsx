'use client'

import GradientButton from "@/components/ui/buttons/GradientButton"
import ConfigTitle from "@/components/ui/buttons/ConfigTitle"
import standardProfile from "$/public/images/paintings/standard-profile-picture.jpg";
import arrowSVG from "$/public/images/svg/arrow.svg";
import Image from "next/image"
import Link from "next/link"
import { RootState, useAppSelector } from "@/store/store";
import ConfigOptions from "@/components/ui/buttons/ConfigOpitions";
import { useEffect, useState } from "react";

const Config = () => {

  const user = useAppSelector((state: RootState) => state.user)
  const [alt, setAlt] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    setAlt(user.nome)
    setUserName(user.nome)
  }, [user])

  const exit = () => {

  }

  const deleteAccount = () => {
    
  }

  return (
    <main className="bg-blue-7 h-screen flex justify-center p-4 md:pt-8 md:bg-transparent md:h-auto md:grow">
      <div className="flex flex-col gap-6 md:gap-12 w-full md:w-1/3">
        <ConfigTitle text="Configurações" returnButton/>
        <div className="flex flex-col items-center justify-between grow md:grow-0 md:gap-20">
          <div className="flex flex-col items-center justify-center w-full gap-6 md:gap-10">
            <Link href={'/home/config/profile'} className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Image
                  alt={alt}
                  src={user.foto_usuario? user.foto_usuario : standardProfile}
                  width={200}
                  height={200}
                  className="rounded-full h-[10vh] w-auto md:h-[4.5rem]"
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
                <ConfigOptions text="Gerenciar Conta" url="/home/config/acount"/>
              </li>
              <li>
                <ConfigOptions text="Endereços" url="/home/config/address"/>
              </li>
              <li>
                <ConfigOptions text="Preferências" url="/home/config/preferences"/>
              </li>
              <li>
                <ConfigOptions text="Ajustar feed inicial" url="/home/config/feed"/>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <GradientButton onClick={exit} className="w-full h-12 [&>p]:!text-xl" direction="right" label="Sair" primaryColor='blue-1' secundaryColor='blue-2'/>
            <GradientButton onClick={deleteAccount} className="w-full h-12 [&>p]:!text-xl" direction="right" label="Excluir conta" primaryColor='blue-4' secundaryColor='blue-3'/>
          </div>
        </div>
      </div>
    </main>
  )

}

export default Config
  