'use client'

import useWindowDimensions from '@/hooks/useWindowDimension'
import ReturnButton from "@/components/ui/buttons/ReturnButton";

const VeniceLayout = ({children}: {children: React.ReactNode}) => {

    const setReturnButtonColorByWindowWidht = () => {
        const { width } = useWindowDimensions()
        if(width && width < 768)
            return 'blue'
        else
            return 'white'
    }

    return (
        <div className="w-full min-h-screen grid grid-rows-[auto_1fr] md:items-center p-4 md:p-10 2xl:p-24 gap-4 md:gap-0 bg-blue-7 md:bg-venice-bridge bg-no-repeat bg-cover bg-fixed">
            <header className="flex items-center justify-start w-full h-fit">
                <ReturnButton width={6} color={setReturnButtonColorByWindowWidht()}/>
            </header>
            {children}
        </div>
    )
}

export default VeniceLayout