'use client'

import Image from "next/image";
import whiteArrowLeft from "/public/images/svg/white-arrow-left.svg";
import blueArrowLeft from "/public/images/svg/blue-arrow-left.svg";
import darkBlueArrowLeft from "/public/images/svg/dark-blue-arrow-left.svg";
import { useRouter } from "next/navigation";
import React from "react";

interface returnButtonProps {
    width: number;
    color: 'blue' | 'white' | 'darkBlue'
}

const ReturnButton: React.FC<returnButtonProps> = ({width, color}) => {
    
    const router = useRouter()

    const handleBackClick = () => {
        router.back()
    }

    const buttonColor = () => {
        if(color == "blue")
            return blueArrowLeft
        else if (color == "darkBlue") 
            return darkBlueArrowLeft
        else 
            return whiteArrowLeft
    }

    return(
        <button onClick={handleBackClick} className={`h-full w-auto`}>
            <Image
                alt = "Botão para retornar"
                src = {buttonColor()}
                style={
                    {width: `${width}vh`}
                }  
            />
        </button>
    )
}

export default ReturnButton;