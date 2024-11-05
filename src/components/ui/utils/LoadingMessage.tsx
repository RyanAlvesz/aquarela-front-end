import React from "react"

interface LoadingMessageProps {
    message: string
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({message}) => {
    return (
        <div className="absolute bg-blue-7 md:bg-white inset-0 flex flex-col gap-6 md:gap-12 items-center px-6 justify-center">
            <p className="text-2xl md:text-title-mobile text-blue-1 font-medium text-center">
                {message}
            </p>
            <div className="loader"></div>
        </div>
    )
}

export default LoadingMessage