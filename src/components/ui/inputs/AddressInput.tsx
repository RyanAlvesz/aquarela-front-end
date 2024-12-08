import React from 'react'

interface AddressProps {
    label: string
    value: string | number
    setValue: (value: string) => void
    type?: React.HTMLInputTypeAttribute
    className?: string
    disabled?: boolean
    maxLength?: number
}

const AddressInput: React.FC<AddressProps> = ({ label, value, setValue, type = 'text', className = '', disabled = false, maxLength }) => {
    return (
        <label htmlFor={label} className={`flex flex-col gap-1 text-blue-1 ${className}`}>
            <span className='font-medium md:font-bold md:text-lg'>{label}</span>
            <input
                id={label}
                type={type}
                value={value ?? ''}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
                maxLength={maxLength}
                className='text-[120%] placeholder:text-blue-1/50 bg-blue-white/50 focus:bg-blue-white hover:bg-white disabled:bg-blue-6/80 disabled:cursor-not-allowed shadow-sm rounded-md px-3 py-2'
            />
        </label>
    )
}

export default AddressInput