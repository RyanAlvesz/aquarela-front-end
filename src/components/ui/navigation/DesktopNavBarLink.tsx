'use client'

import { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"
import React from "react"
import { usePathname } from 'next/navigation'

interface DesktopNavBarLinkProps {
    link: Url
    text: string
}

const DesktopNavBarLink: React.FC<DesktopNavBarLinkProps> = ({link, text}) => {

    const pathname = usePathname()  
    const comparison = pathname === link   

    return(
        <Link
            href={link}
            className="relative"
        >
            <h2 className={`font-medium text-base relative z-10 ${comparison? 'text-white': 'text-blue-1'}`}>{text}</h2>
            {comparison && (
                <div className="absolute animate-fade ease-linear duration-100 w-[calc(100%+24px)] h-[calc(100%+12px)] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-3xl bg-blue-1" />
            )}  
        </Link>
    )
}

export default DesktopNavBarLink