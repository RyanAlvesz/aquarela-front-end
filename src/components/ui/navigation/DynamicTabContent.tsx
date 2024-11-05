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
        <nav className="w-full h-fit flex flex-col">
            <div 
                className="grid items-center w-full justify-center h-[5vh]"
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