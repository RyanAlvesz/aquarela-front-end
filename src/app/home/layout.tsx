'use client'

import DesktopNavBar from "@/components/ui/navigation/DesktopNavBar"
import ReduxProvider from "@/store/redux-provider"

const HomeLayout = ({children}: {children: React.ReactNode}) => {
    
    return(
        <ReduxProvider>
            <div className="bg-blue-7 md:bg-white h-screen md:pt-[calc(10.5vh+1rem)]">
                <DesktopNavBar />
                {children}
            </div>
        </ReduxProvider>
    )
}

export default HomeLayout