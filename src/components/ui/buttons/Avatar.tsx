'use client'

import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

import standardProfile from "$/public/images/paintings/standard-profile-picture.jpg";
import { BaseUser } from "@/types";

interface AvatarProps {
    user: BaseUser
    className?: string,
    nickname: string
}

const Avatar: React.FC<AvatarProps> = ({user, className, nickname}) => {    7

    const [alt, setAlt] = useState('')
    const [profilePath, setProfilePath] = useState('')  
    const [image, setImage] = useState<StaticImageData | string>(standardProfile)

    useEffect(()=>{
        setProfilePath(nickname)
    }, [nickname])

    useEffect(() => {
        setAlt(user.nome)
        setImage(user.foto_usuario as string)
    }, [user])

    return (
        <Link 
            href={'/home/profile/' + profilePath}
            className= {`shrink-0 rounded-full flex items-center justify-center aspect-square overflow-hidden ${className}`}
        >
                <Image 
                    alt={alt} 
                    src={image}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                />
        </Link>
    )
}

export default Avatar