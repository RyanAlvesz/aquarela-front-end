'use client'

import React, { useEffect, useState } from "react"

interface CreateItemInputProps {
    type: React.HTMLInputTypeAttribute
    value: string
    label: string
    required?: boolean
    maxLength?: number
    className?: string
    onChange: (newValue: string) => void
}

const CreateItemInput: React.FC<CreateItemInputProps> = ({label, type, onChange, value, required, maxLength, className}) => {
   
    const [inputValue, setInputValue] = useState(value)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    useEffect(() => {
        setInputValue(value);
    }, [value])
   
    return(
        <label htmlFor={label} className="flex flex-col gap-1">
            <span className="text-blue-1 font-medium">{label}</span>
            <input 
                onChange={handleChange}
                value={inputValue}
                maxLength={maxLength}
                required={required}
                type={type}
                id={label}
                name={label}
                className="bg-blue-5/70 focus:outline focus:outline-1 outline-blue-5 rounded w-full text-[100%] text-blue-2 px-2 py-3"
            />
        </label>
    )
}

export default CreateItemInput