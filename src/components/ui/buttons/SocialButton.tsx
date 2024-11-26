import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import React from "react"

interface SocialButtonProps {
    src: string | StaticImport
    action: () => void
    alt: string
    className?: string
}

const SocialButton: React.FC<SocialButtonProps> = ({src, alt, action, className}) => {
    return(
        <button className={`h-8 w-8 ${className? className : ''}`} onClick={action}>
            <Image
                alt={alt}
                src={src}
                width={50}
                height={50}
                className="w-full h-full"
            />
        </button>
    )
}

export default SocialButton