import React from "react"

interface PreferencesInputProps {
    label: string;
    isChecked: boolean;
    onChange: () => void;
}

const PreferencesInput: React.FC<PreferencesInputProps> = ({ label, isChecked, onChange }) => {

    return (
        <label className="flex items-center w-full gap-2 md:gap-4 cursor-pointer">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
                className="hidden"
            />
            <div
                className={`relative p-1 w-12 h-6 md:w-16 md:h-8 rounded-full ease-linear duration-150 ${isChecked ? "bg-blue-1" : "bg-blue-5"
                    }`}
            >
                <span
                    className={`absolute w-6 h-6 rounded-full shadow-md ease-linear duration-500 ${isChecked ? "translate-x-6 md:translate-x-8 bg-blue-5" : "translate-x-0 bg-blue-1"
                        }`}
                ></span>
            </div>
            <span className="text-blue-1 text-base md:text-2xl dark:text-blue-6">{label}</span>
        </label>
    )
}

export default PreferencesInput