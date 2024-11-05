import React, { useState } from "react";

interface ToolTipProps {
    children: React.ReactNode
    message: string
}

const ToolTip: React.FC<ToolTipProps> = ({children, message}) => {
    
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    
    return(
        <div
            className="relative h-fit flex items-center justify-center"
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            {children}
            {isVisible && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-auto whitespace-nowrap px-2 py-1 bg-blue-1 text-white text-sm rounded shadow-lg transition-opacity duration-300 opacity-100">
                    {message}
                </div>
            )}
        </div>
    )
}

export default ToolTip;