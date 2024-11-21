'use client'

import React, { useEffect, useState } from "react"
import ReturnButton from "../buttons/ReturnButton"
import shareSVG from '$/public/images/svg/share.svg'
import configSVG from '$/public/images/svg/configuration.svg'
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import alert from "@/types/alert"

interface MobileProfileOptionsProps {
    secondaryButton?: 'share' | 'config'
}

const MobileProfileOptions: React.FC<MobileProfileOptionsProps> = ({secondaryButton}) => {    
        
    const [currentSVG, setCurrentSVG] = useState(secondaryButton === 'config' ? configSVG : shareSVG);
    const router = useRouter()
    const pathname = usePathname()
    
    useEffect(() => {
        setCurrentSVG(secondaryButton === 'config' ? configSVG : shareSVG);
    }, [secondaryButton])

    const handleClick = async() => {
        if(secondaryButton == 'config'){
            router.push('/home/config')
        } else {
            await navigator.clipboard.writeText('https://aquarela-front-end.vercel.app' + pathname)
            alert({
                icon: 'success',
                title: 'Perfil copiado para área de trasnferência'
            })
        }
    }    

    return(
        <nav className={`absolute right-0 left-0 top-0 flex items-center p-4 md:hidden ${secondaryButton? 'justify-between' : 'justify-start'}`}>
            <ReturnButton color="darkBlue" width={6}/>
            {secondaryButton && (
                <button
                    onClick={handleClick}
                >
                    <Image 
                        alt={secondaryButton}
                        src={currentSVG}
                        width={100}
                        height={100}
                        style={
                            {width: "6vh"}
                        }  
                    />
                </button>
            )}
        </nav>
    )
}

export default MobileProfileOptions