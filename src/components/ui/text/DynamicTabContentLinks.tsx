'use client'

import { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

interface DynamicTabContentLinksProps {
    link: Url
    text: string
}

const DynamicTabContentLinks: React.FC<DynamicTabContentLinksProps> = ({link, text}) => {
    
    const pathname = usePathname()
    const isActive = pathname === link

    return (
        <Link 
            href={link} 
            className={`w-full bg-blue-7 md:bg-transparent border-b-2 py-2 text-center relative text-sm font-medium md:border-none md:text-[18px] md:px-3
                ${isActive? 'border-blue-1 text-blue-1 font-bold md:animate-shake ease-linear duration-75 md:underline md:underline-offset-8' : 'border-blue-2 text-blue-2'}
            `}
        >
            {text}
        </Link>
    )
}

export default DynamicTabContentLinks