'use client'

import ReturnButton from "@/components/ui/buttons/ReturnButton"
import { RootState, useAppSelector } from "@/store/store"
import React, { useEffect, useState } from "react"

interface ConfigTitleProps{
    text: string
    returnButton: boolean,
    desktopReturnButton?: boolean
    className?: string
}

const ConfigTitle: React.FC<ConfigTitleProps> = ({text, returnButton, desktopReturnButton, className}) => {
    
    const [isDarkMode, setIsDarkMode] = useState<boolean>()
    const darkMode = useAppSelector((state: RootState) => state.darkMode.darkMode)

    useEffect(() => {
        setIsDarkMode(darkMode)
    }, [darkMode])

    return(
        <nav className={`flex items-center justify-between ${className} ${!desktopReturnButton? 'md:justify-center' : ''}`}>
            <div className={`flex items-center justify-start ${!desktopReturnButton? 'md:hidden' : 'md:w-[6vh]'}`}>
                {returnButton? (
                    <ReturnButton color={!isDarkMode ? "darkBlue" : "white"} width={6} className={`md:!w-[4.5vh] z-0 relative`} noZ/>
                ) : (
                    <div className="w-[6vh]"></div>
                )}
            </div>
            <h1 className="text-blue-1 font-medium text-xl md:text-3xl md:font-bold md:dark:text-white">{text}</h1>
            <div className={`w-[6vh] ${!desktopReturnButton? 'md:hidden' : ''}`}></div>
       </nav>
    )
}

export default ConfigTitle