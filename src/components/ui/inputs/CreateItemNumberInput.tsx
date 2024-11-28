import Image from "next/image"
import React from "react"
import addSVG from '$/public/images/svg/plus-blue.svg'
import subtractSVG from '$/public/images/svg/minus-blue.svg'

interface CreateItemNumberInputProps {
    type: 'number' | 'price'
    value: number
    label: string
    required?: boolean
    maxLength?: number
    className?: string
    onChange: (newValue: number) => void
}

const CreateItemNumberInput: React.FC<CreateItemNumberInputProps> = ({ label, type, onChange, value, required, maxLength, className = '' }) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')
            e.preventDefault()
    }

    const subtract = () => {
        if (value >= 1)
            onChange(value - 1)
    }

    const add = () => {
        if (value >= 0)
            onChange(value + 1)
    }

    return (
        <label htmlFor={label} className={`flex flex-col gap-1 ${className}`}>
            <span className="text-blue-1 font-medium">{label}</span>
            {type == 'number' ? (
                <div className="w-full h-12 bg-blue-5/70 rounded grid grid-cols-[auto_1fr_auto]">
                    <button
                        className="h-full w-12 flex items-center justify-center bg-blue-5/70"
                        onClick={subtract}
                        type="button"
                    >
                        <Image
                            src={subtractSVG}
                            alt="Diminuir valor"
                            width={100}
                            height={100}
                            className="w-1/2 h-1/2"
                        />
                    </button>
                    <input
                        value={value}
                        onChange={(e) => onChange(e.target.valueAsNumber)}
                        maxLength={maxLength}
                        required={required}
                        type='number'
                        id={label}
                        name={label}
                        onKeyDown={(e) => handleKeyDown(e)}
                        min={0}
                        minLength={0}
                        className="bg-transparent rounded text-center w-full text-[100%] text-blue-2 px-2 py-3"
                    />
                    <button
                        className="h-full w-12 flex items-center justify-center bg-blue-5/70"
                        onClick={add}
                        type="button"
                    >
                        <Image
                            src={addSVG}
                            alt="Adicionar valor"
                            width={100}
                            height={100}
                            className="w-1/2 h-1/2"
                        />
                    </button>
                </div>
            ) : (
                <div className="w-full h-12 bg-blue-5/70 px-2 py-3 items-center justify-center rounded flex gap-1 text-[100%] text-blue-2">
                    <span>R$:</span>
                    <input
                        value={value}
                        onChange={(e) => onChange(e.target.valueAsNumber)}
                        maxLength={maxLength}
                        required={required}
                        type='number'
                        id={label}
                        name={label}
                        onKeyDown={(e) => handleKeyDown(e)}
                        min={0}
                        minLength={0}
                        className="bg-transparent grow"
                    />
                </div>
            )}
        </label>
    )

}

export default CreateItemNumberInput