import Image from "next/image";
import aquarelaLogo from "$/public/images/logo/aquarela-6.png"

const PreferencesLogoText = () => {
    return(
        <div className="flex flex-col items-center justify-center gap-1 w-full">
            <Image
                src={aquarelaLogo}
                className="w-1/2 md:w-auto md:h-[8vh]"
                alt="Aquarela"
                priority
            />
            <h1 className="font-medium text-blue-3 text-body-mobile md:text-subtitle-desktop">Quais temas te interessam?</h1>
        </div>
    )
}

export default PreferencesLogoText;