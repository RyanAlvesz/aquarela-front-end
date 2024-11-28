'use client'

import React from "react"

interface CreateItemInputProps {
    type: React.HTMLInputTypeAttribute
    value: string
    label: string
    required?: boolean
    maxLength?: number
    className?: string
    onChange: (newValue: string) => void
}

const CreateItemInput: React.FC<CreateItemInputProps> = ({label, type, onChange, value, required, maxLength, className = ''}) => {
   
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter')
        e.preventDefault()
    }

    return(
        <label htmlFor={label} className={`flex flex-col gap-1 ${className}`}>
            <span className="text-blue-1 font-medium">{label}</span>
            <input 
                value={value}
                onChange={(e) => onChange(e.target.value)} 
                maxLength={maxLength}
                required={required}
                type={type}
                id={label}
                name={label}
                onKeyDown={(e) => handleKeyDown(e)}
                className="bg-blue-5/70 focus:outline focus:outline-1 outline-blue-5 rounded w-full text-[100%] h-12 text-blue-2 px-2 py-3"
            />
        </label>
    )
}

export default CreateItemInput