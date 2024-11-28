'use client'

import Image from "next/image";
import React, { useState } from "react";
import checkSVG from "$/public/images/svg/check.svg";

interface RememberMeProps {
    onChange: (isChecked: boolean) => void;
}


const RememberMe: React.FC<RememberMeProps>= ({onChange}) => {

    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onChange(newCheckedState);
    }

    return (
        <label className="select-none flex gap-1 items-center justify-center 2xl:gap-4">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                className="hidden"
            />
            <div className={`w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8 border-2 rounded-md ${isChecked ? 'bg-blue-2 border-blue-2' : 'bg-transparent border-blue-2'
                } flex items-center justify-center transition-all duration-200`}>
                {isChecked && (
                    <Image
                        alt="Selecionado"
                        src={checkSVG}
                        width={50}
                        height={50}
                        className="h-auto w-full"
                    />
                )}
            </div>
            <span className="text-blue-2 text-sm md:text-base 2xl:text-2xl">Lembre-se de mim</span>
        </label>
    )
}

export default RememberMe
