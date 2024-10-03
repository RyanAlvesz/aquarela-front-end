'use client'

import colors from "@/types/colors";
import React from "react";

type Colors = keyof typeof colors
type gradientDirection = 'top' | 'right' | 'bottom' | 'left'

interface gradientButtonProps {
    primaryColor: Colors
    secundaryColor: Colors
    direction: gradientDirection
    label: string
}

const GradientButton: React.FC<gradientButtonProps> = ({primaryColor, secundaryColor, direction, label}) => {
    
    const getColor = (colorValue: Colors) => { return  colors[colorValue] } 

    const gradientStyle = {
        backgroundImage: `linear-gradient(to ${direction}, ${getColor(primaryColor)}, ${getColor(secundaryColor)})`
    }
        
    return(
        <button
        style= {gradientStyle}
        className={`flex items-center justify-center rounded-lg w-full py-3 md:col-span-2`}>
            <p className={`text-white font-medium text-subtitle-mobile md:text-subtitle-desktop`}>{label}</p>
        </button>
    )
}

export default GradientButton