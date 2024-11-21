'use client'

import colors from "@/types/colors";
import React from "react";

type Colors = keyof typeof colors
type gradientDirection = 'top' | 'right' | 'bottom' | 'left'

interface GradientButtonProps {
    primaryColor: Colors
    secundaryColor: Colors
    direction: gradientDirection
    label: string,
    className?: string
    onClick?: () => void
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
}

const GradientButton: React.FC<GradientButtonProps> = ({primaryColor, secundaryColor, direction, label, className, onClick, type}) => {
    
    const getColor = (colorValue: Colors) => { return  colors[colorValue] } 

    const gradientStyle = {
        backgroundImage: `linear-gradient(to ${direction}, ${getColor(primaryColor)}, ${getColor(secundaryColor)})`
    }
        
    return(
        <button
        onClick={onClick}
        style= {gradientStyle}
        type={type}
        className={`flex items-center justify-center rounded-lg ` + className}>
            <p className={`text-white font-medium text-subtitle-mobile md:text-subtitle-desktop`}>{label}</p>
        </button>
    )
}

export default GradientButton