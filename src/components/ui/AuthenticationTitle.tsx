import React from "react";

interface authenticationTitleProps {
    title: string
    subtitle: string
}

const AuthenticationTitle: React.FC<authenticationTitleProps> = ({title, subtitle}) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-blue-2 font-medium text-title-mobile 2xl:text-title-desktop">{title}</h1>
          <span className="text-blue-3 font-medium text-body-mobile md:text-2xl 2xl:text-6xl">{subtitle}</span>
        </div>
    )
}

export default AuthenticationTitle