import { StaticImport } from "next/dist/shared/lib/get-img-props"
import { Url } from "next/dist/shared/lib/router/router"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface createPublicationChoiceButtonProps {
    link: Url,
    alt: string, 
    image: string | StaticImport,
    text: string
}

const CreatePublicationChoiceButton: React.FC<createPublicationChoiceButtonProps> = ({link, alt, image, text}) => {
    return(
        <Link href={link} className="bg-blue-1 h-[18vh] w-[18vh] shrink-0 rounded-lg text-center flex flex-col items-center justify-center gap-1 text-white text-[0.8rem] p-3 font-medium">
        <Image
            alt={alt}
            src={image}
            className="w-1/2"
        />
        <h2>{text}</h2>
    </Link>
    )
}

export default CreatePublicationChoiceButton