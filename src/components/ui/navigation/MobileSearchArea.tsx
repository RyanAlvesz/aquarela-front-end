import Image from "next/image"

import logo from "$/public/images/logo/aquarela-6.png";
import SearchBar from "../forms/SearchBar";

const MobileSearchArea = () => {
    return(
        <div className="flex flex-col gap-4 px-6 items-center justify-center md:hidden">
            <button className="w-1/2">
                <Image
                    alt="Aquarela logo"
                    src={logo} 
                    className="w-full h-full"
                    priority
                />
            </button>
            <SearchBar />
        </div>
    )
}

export default MobileSearchArea