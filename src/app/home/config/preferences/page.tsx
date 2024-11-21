'use client'

import ConfigTitle from "@/components/ui/buttons/ConfigTitle"
import PreferencesInput from "@/components/ui/inputs/PreferencesInput"
import { setDarkMode } from "@/store/darkModeSlice"
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import { useEffect } from "react"

const ConfigPreferences = () => {

  const user = useAppSelector((state: RootState) => state.user)
  const darkMode = useAppSelector((state: RootState) => state.darkMode.darkMode)
  const dispatch = useAppDispatch()


  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode])

  const handleAvailability = () => {}
  const handleComments = () => {}
  const handleDarkMode = () => {
    dispatch(setDarkMode(!darkMode))
  }

    return (
      <main className="bg-blue-7 min-h-screen flex justify-center p-4 md:py-8 md:bg-transparent md:h-fit md:grow">
        <div className="flex flex-col gap-8 md:gap-12 w-full md:w-1/3">
          <ConfigTitle text="Preferências" returnButton desktopReturnButton />
          <div className="flex flex-col gap-3 md:gap-4 w-full md:p-0">
            <PreferencesInput label="Posso receber pedidos de arte" onChange={handleAvailability} initialState={user.disponibilidade as boolean} />
            <PreferencesInput label="Permitir comentários" onChange={handleComments} initialState={false} />
            <PreferencesInput label="Modo escuro" onChange={handleDarkMode} initialState={darkMode} />
          </div>
        </div>
      </main>
    )
}

export default ConfigPreferences
  