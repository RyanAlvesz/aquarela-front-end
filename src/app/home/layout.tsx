'use client'

import DesktopNavBar from "@/components/ui/navigation/DesktopNavBar"
import ReduxProvider from "@/store/redux-provider"

const HomeLayout = ({children}: {children: React.ReactNode}) => {
    
    return(
        <ReduxProvider>
            <div className="bg-blue-7 flex flex-col md:bg-white min-h-screen md:pt-[calc(10vh+1rem)] 2xl:pt-[calc(8vh+1rem)]">
                <DesktopNavBar />
                {children}
            </div>
        </ReduxProvider>
    )
}

export default HomeLayout