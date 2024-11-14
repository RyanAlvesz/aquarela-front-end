import React from "react"

interface ProfileMessageProps{
    message: string
}

const ProfileMessage: React.FC<ProfileMessageProps> = ({message}) => {
    return(
        <div className="absolute top-0 w-screen left-0 right-0 flex items-center justify-center text-base text-center font-medium text-blue-1 p-6">
            {message}
        </div>
    )
}

export default ProfileMessage