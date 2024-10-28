'use client'

import { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"
import React from "react"
import { usePathname } from 'next/navigation'

interface desktopNavBarLinkProps {
    link: Url
    text: string
}

const DesktopNavBarLink: React.FC<desktopNavBarLinkProps> = ({link, text}) => {

    const pathname = usePathname()  
    
    const comparison = pathname === link

    return(
        <Link
            href={link}
            className="relative"
        >
            <h2 className={`font-medium text-lg relative z-10 ${comparison? 'text-white': 'text-blue-1'}`}>{text}</h2>
            {comparison && (
                <div className="absolute w-[calc(100%+24px)] h-[calc(100%+12px)] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-3xl bg-blue-1" />
            )}  
        </Link>
    )
}

export default DesktopNavBarLink