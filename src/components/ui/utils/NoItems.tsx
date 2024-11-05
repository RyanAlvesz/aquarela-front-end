import React from "react"

interface NoItemsProps {
    message: string
}

const NoItems: React.FC<NoItemsProps> = ({message}) => {
    return(
        <div>
            {message}
        </div>
    )
}

export default NoItems