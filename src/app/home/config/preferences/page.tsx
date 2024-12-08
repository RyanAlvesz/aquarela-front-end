'use client'

import ConfigTitle from "@/components/ui/buttons/ConfigTitle"
import PreferencesInput from "@/components/ui/inputs/PreferencesInput"
import { fetchWrapper } from "@/lib/api/fetch"
import { setDarkMode } from "@/store/darkModeSlice"
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import { setUser } from "@/store/userSlice"
import { BaseUser } from "@/types"
import { useEffect, useState } from "react"

interface respProps {
  status: boolean
}

const ConfigPreferences = () => {

  const user = useAppSelector((state: RootState) => state.user)
  const darkMode = useAppSelector((state: RootState) => state.darkMode.darkMode)
  const dispatch = useAppDispatch()

  const [availability, setAvailability] = useState<boolean>(Boolean(Number(user.disponibilidade)))

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode])

  useEffect(() => {
    console.log(user.disponibilidade);
    setAvailability(Boolean(Number(user.disponibilidade)))
  }, [user])

  const handleAvailability = async() => {

    const updatedUser: BaseUser = {
      ...user,
      ...{ disponibilidade: !availability },
    }

    const url: string = 'v1/aquarela/user/' + updatedUser.id

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        disponibilidade: updatedUser.disponibilidade
      })
    }

    const resp = await fetchWrapper<respProps>(url, options)
    console.log(resp);
    
    
    if (resp.status == true) {      
      dispatch(setUser(updatedUser))
    }

  }

  const handleDarkMode = () => {
    dispatch(setDarkMode(!darkMode))
  }

    return (
      <main className="bg-blue-7 min-h-screen flex justify-center p-4 md:py-8 md:bg-transparent md:h-fit md:grow">
        <div className="flex flex-col gap-8 md:gap-12 w-full md:w-1/3">
          <ConfigTitle text="Preferências" returnButton desktopReturnButton />
          <div className="flex flex-col gap-3 md:gap-4 w-full md:p-0">
            <PreferencesInput label="Permitir mensagens" onChange={handleAvailability} isChecked={availability} />
            <PreferencesInput label="Modo escuro" onChange={handleDarkMode} isChecked={darkMode} />
          </div>
        </div>
      </main>
    )
}

export default ConfigPreferences
  