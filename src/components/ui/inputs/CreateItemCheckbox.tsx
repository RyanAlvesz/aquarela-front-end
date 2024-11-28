import Image from "next/image";
import React from "react";
import checkSVG from "$/public/images/svg/check.svg";

interface CreateItemCheckboxProps {
    setChecked: () => void
    checked: boolean
    label: string,
    className?: string
}

const CreateItemCheckbox: React.FC<CreateItemCheckboxProps> = ({checked, setChecked, label, className = ''}) => {

    return (
        <label className={`select-none flex gap-2 items-center w-full cursor-pointer my-1 ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={setChecked}
                className="hidden"
            />
            <div className={`border rounded-md p-1 w-6 h-6 ${checked ? 'bg-blue-2 border-blue-2' : 'bg-blue-5/70 border-blue-2'
                } flex items-center justify-center transition-all duration-200`}>
                {checked && (
                    <Image
                        alt="Selecionado"
                        src={checkSVG}
                        width={50}
                        height={50}
                        className="h-auto w-full"
                    />
                )}
            </div>
            <span className="text-blue-1 text-base">{label}</span>
        </label>
    )
}

export default CreateItemCheckbox