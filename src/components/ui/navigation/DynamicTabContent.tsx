'use client'

import React, { ReactNode } from "react"
import DynamicTabContentLinks from "../text/DynamicTabContentLinks"

interface DynamicTabContentProps {
    children: ReactNode
    currentUser: boolean
    userNickname: string
}

const DynamicTabContent: React.FC<DynamicTabContentProps> = ({children, currentUser, userNickname}) => {
    
    return (
        <nav className="w-full grow flex bg-blue-5/40 md:bg-transparent gap-4 flex-col md:items-center">
            <div 
                className="grid items-center w-full md:w-fit justify-center"
                style={{
                    gridTemplateColumns: `repeat(${currentUser? '3' : '2'}, 1fr)`
                }}
            >
                <DynamicTabContentLinks
                    link={'/home/profile/' + userNickname}
                    text="Publicações"
                />
                <DynamicTabContentLinks
                    link={'/home/profile/' + userNickname + '/folders'}
                    text="Pastas"
                />
                {currentUser && (
                    <DynamicTabContentLinks
                        link={'/home/profile/' + userNickname + '/favorites'}
                        text="Favoritos"
                    />
                )}
            </div>
            {children}
        </nav>
    )
}

export default DynamicTabContent