'use client'

import useWindowDimensions from '@/hooks/useWindowDimension'
import ReturnButton from "@/components/ui/buttons/ReturnButton";

const VeniceLayout = ({children}: {children: React.ReactNode}) => {

    const SetReturnButtonColorByWindowWidht = () => {
        const { width } = useWindowDimensions()
        if(width && width < 768)
            return 'blue'
        else
            return 'white'
    }

    return (
        <div className="w-full min-h-screen grid grid-rows-[auto_1fr] md:grid-cols-[12fr_11fr] md:grid-rows-1 p-4 md:p-0 gap-4 bg-blue-7 md:bg-venice-bridge bg-no-repeat bg-cover md:bg-right bg-fixed">
            <header className="flex items-center justify-start w-full h-fit md:p-9 2xl:p-16">
                <ReturnButton width={6} color={SetReturnButtonColorByWindowWidht()}/>
            </header>
            {children}
        </div>
    )
}

export default VeniceLayout