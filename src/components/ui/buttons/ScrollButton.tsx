import React from "react";
import arrowImg from "$/public/images/svg/blue-arrow-left.svg"
import Image from "next/image";

interface scrollButtonProps {
    className: string
    onClick: () => void
}

const ScrollButton: React.FC<scrollButtonProps> = ({onClick, className}) => {

    return(
        <button onClick={onClick} type="button" className={className}>
            <Image
                alt="Seta para rolagem lateral"
                src={arrowImg}
                className={'w-full h-full'}
            />            
        </button>
    )
}

export default ScrollButton;