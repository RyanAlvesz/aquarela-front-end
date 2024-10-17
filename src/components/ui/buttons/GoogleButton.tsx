import Image from "next/image"
import React from "react"
import googleSVG from "$/public/images/svg/google.svg"

interface googleButtonProps {
    text: string
}

const GoogleButton: React.FC<googleButtonProps> = ({text}) => {
    return (
        <button
            className="w-full h-fit bg-blue-2 rounded-full grid grid-cols-[auto_1fr] items-center justify-center p-2 px-3 md:col-span-2"
            type="button"
        >
            <Image
                src={googleSVG}
                alt="Google"
                className="h-auto w-6"
            />
            <span
                className="text-body-mobile md:text-body-desktop text-white text-center -translate-x-3"
            >
                {text}
            </span>
        </button>
    )
}

export default GoogleButton