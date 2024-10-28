import Image from "next/image"
import Link from "next/link"
import React from "react"

import standardProfile from "$/public/images/paintings/standard-profile-picture.jpg";
import { User } from "@/types";

interface profileButtonProps {
    user: User
    className?: string,
    id: number
}

const ProfileButton: React.FC<profileButtonProps> = ({user, className, id}) => {    
    return (
        <Link 
            href={'/home/profile/' + id}
            className= {`shrink-0 rounded-full flex items-center justify-center aspect-square overflow-hidden ${className}`}
        >
                <Image 
                    alt={user.nome} 
                    src={user.foto_usuario? user.foto_usuario : standardProfile} 
                />
        </Link>
    )
}

export default ProfileButton