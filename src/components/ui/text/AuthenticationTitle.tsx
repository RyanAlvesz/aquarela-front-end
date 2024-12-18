import React from "react";

interface AuthenticationTitleProps {
    title: string
    subtitle: string
}

const AuthenticationTitle: React.FC<AuthenticationTitleProps> = ({title, subtitle}) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-blue-2 font-medium text-title-mobile">{title}</h1>
          <span className="text-blue-3 font-medium text-body-mobile md:text-2xl">{subtitle}</span>
        </div>
    )
}

export default AuthenticationTitle