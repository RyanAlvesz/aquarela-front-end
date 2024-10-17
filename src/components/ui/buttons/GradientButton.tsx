'use client'

import colors from "@/types/colors";
import React from "react";

type Colors = keyof typeof colors
type gradientDirection = 'top' | 'right' | 'bottom' | 'left'

interface gradientButtonProps {
    primaryColor: Colors
    secundaryColor: Colors
    direction: gradientDirection
    label: string,
    className?: string
    onClick?: () => void
}

const GradientButton: React.FC<gradientButtonProps> = ({primaryColor, secundaryColor, direction, label, className, onClick}) => {
    
    const getColor = (colorValue: Colors) => { return  colors[colorValue] } 

    const gradientStyle = {
        backgroundImage: `linear-gradient(to ${direction}, ${getColor(primaryColor)}, ${getColor(secundaryColor)})`
    }
        
    return(
        <button
        onClick={onClick}
        style= {gradientStyle}
        className={`flex items-center justify-center rounded-lg ` + className}>
            <p className={`text-white font-medium text-subtitle-mobile md:text-subtitle-desktop`}>{label}</p>
        </button>
    )
}

export default GradientButton