import ReturnButton from "@/components/ui/buttons/ReturnButton"
import React from "react"

interface ConfigTitleProps{
    text: string
    returnButton: boolean,
    desktopReturnButton?: boolean
}

const ConfigTitle: React.FC<ConfigTitleProps> = ({text, returnButton, desktopReturnButton}) => {
    return(
        <nav className={`flex items-center justify-between ${!desktopReturnButton? 'md:justify-center' : ''}`}>
            <div className={`flex items-center justify-center ${!desktopReturnButton? 'md:hidden' : 'md:w-[6vh]'}`}>
                {returnButton? (
                    <ReturnButton color="darkBlue" width={6} className={`md:!w-[4.5vh]`}/>
                ) : (
                    <div className="w-[6vh]"></div>
                )}
            </div>
            <h1 className="text-blue-1 font-medium text-xl md:text-3xl md:font-bold">{text}</h1>
            <div className={`w-[6vh] ${!desktopReturnButton? 'md:hidden' : ''}`}></div>
       </nav>
    )
}

export default ConfigTitle