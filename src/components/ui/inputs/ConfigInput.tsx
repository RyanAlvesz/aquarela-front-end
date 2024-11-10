'use client'

import React, { useEffect, useState } from "react"

interface ConfigInputProps {
    type: React.HTMLInputTypeAttribute
    value: string
    label: string
    onChange: (newValue: string) => void
}

const ConfigInput: React.FC<ConfigInputProps> = ({label, type, onChange, value}) => {
    
    const [inputValue, setInputValue] = useState(value)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    useEffect(() => {
        setInputValue(value);
      }, [value]);
    
    return(
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={label} className="font-medium text-blue-1 text-[1.15rem]">{label}</label>
            <input onChange={handleChange} value={inputValue} type={type} id={label} name={label} className="p-2 md:px-3 h-[7vh] md:h-[6vh] rounded-md text-blue-1 bg-blue-5/90"/>
        </div>
    )
}

export default ConfigInput