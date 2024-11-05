import { StaticImport } from "next/dist/shared/lib/get-img-props"
import { Url } from "next/dist/shared/lib/router/router"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface MobileNavBarButtonProps {
    image: string | StaticImport,
    alt: string,
    link: Url
}

const MobileNavBarButton: React.FC<MobileNavBarButtonProps> = ({image, alt, link}) => {
    return(
        <Link href={link} className="flex items-center justify-center w-[calc(7vh-0.5rem)]">
            <Image 
                alt={alt}
                src={image} 
                className="h-8"
            />
        </Link>
    )
}

export default MobileNavBarButton