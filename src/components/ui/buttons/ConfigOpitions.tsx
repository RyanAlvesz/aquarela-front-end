import Image from "next/image";
import Link from "next/link";

import arrowSVG from "$/public/images/svg/arrow.svg";
import React from "react";
import { Url } from "next/dist/shared/lib/router/router";

interface ConfigOptionsProps {
    text: string
    url: Url
}

const ConfigOptions: React.FC<ConfigOptionsProps> = ({text, url}) => {
    return (
        <Link href={url} className="flex items-center justify-between">
            <span className="text-blue-1 text-base font-medium md:text-xl"> {text} </span>
            <Image
                alt='Seta para direita'
                src={arrowSVG}
                width={50}
                height={50}
                className="h-10 w-auto rotate-180"
            />
        </Link>
    )
}

export default ConfigOptions;