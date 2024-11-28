'use client'

import React, { useState } from "react";
import Image from "next/image";

import { IInputState, setInputValue } from "@/store/inputSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

import birthdayCake from '$/public/images/svg/birthday-cake.svg'
import cpf from '$/public/images/svg/cpf.svg'
import mail from '$/public/images/svg/mail.svg'
import passwordLock from '$/public/images/svg/password-lock.svg'
import telephone from '$/public/images/svg/telephone.svg'
import user from '$/public/images/svg/user.svg'
import nickname from '$/public/images/svg/nickname.svg'
import eyeOpen from '$/public/images/svg/eye-open.svg'
import eyeClosed from '$/public/images/svg/eye-closed.svg'

const icons = {
    birthdayCake,
    cpf,
    mail,
    passwordLock,
    telephone,
    user,
    nickname
}

interface AuthenticationInputProps {
    placeholder: string
    inputType: React.HTMLInputTypeAttribute
    required: boolean
    name: keyof IInputState
    image: keyof typeof icons
    maxChar: number
    minChar?: number
    passwordVisibility?: boolean,
}

const AuthenticationInput: React.FC<AuthenticationInputProps> = ({ placeholder, inputType, required, name, image, maxChar, minChar, passwordVisibility }) => {

    const [currentInputType, setCurrentInputType] = useState(inputType)
    const [isPasswordVisible, setIsPasswordVisible] = useState(passwordVisibility)
    const iconSrc = icons[image];

    const passwordVisibilityToggle = () => {
        setCurrentInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
        setIsPasswordVisible((prevVisibility) => !prevVisibility);
    }

    const formatPhoneNumber = (value: string) => {
        const cleanedInput = value.replace(/\D/g, '')
        const match = cleanedInput.match(/^(\d{2})(\d{5})(\d{0,4})?$/)
        if (match) {
            return `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}`
        }
        return value
    }

    const formatCPF = (input: string): string => {  
        const cleanedInput = input.replace(/\D/g, '')
        const match = cleanedInput.match(/^(\d{3})(\d{3})(\d{3})(\d{0,2})?$/)
        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}${match[4] ? '-' + match[4] : ''}`
        }
        return input
    }

    const removeAccents = (input: string): string => {
        return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    
    const formatUsername = (input: string): string => {
        return removeAccents(input.trim().replace(/\s+/g, ''));
    }

    const dispatch = useAppDispatch()

    const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(name == "telephone")
            dispatch(setInputValue({ field: name, value: formatPhoneNumber(event.target.value) }))
        else if (name == 'cpf')
            dispatch(setInputValue({ field: name, value: formatCPF(event.target.value) }))
        else if (name == 'registerNickname')
            dispatch(setInputValue({ field: name, value: formatUsername(event.target.value) }))
        else
            dispatch(setInputValue({ field: name, value: event.target.value }))
    }

    return (
        <>
            <label
                className="flex items-center w-full text-[120%] p-2 gap-2 rounded-md max-h-12 md:max-h-14 text-blue-2 bg-blue-5/30 shadow-sm shadow-blue-5 2xl:max-h-20 2xl:text-[200%] 2xl:p-4"
            >
                <Image
                    src={iconSrc}
                    alt={name}
                    className="h-4/5 w-auto"
                />
                <input
                    type={currentInputType}
                    minLength={minChar}
                    placeholder={placeholder}
                    name={name}
                    required={required}
                    onChange={handleEvent}
                    maxLength={maxChar}
                    autoComplete="off"
                    value={useAppSelector((state) => state.input[name])}
                    className="w-full bg-transparent placeholder:text-blue-2 placeholder:text-[90%]"
                />
                {
                    passwordVisibility && (
                        <button
                            type="button"
                            onClick={passwordVisibilityToggle}
                            className="h-4/5 shrink-0"
                        >
                            <Image
                                src={isPasswordVisible ? eyeClosed : eyeOpen}
                                alt="Visibilidade da senha"
                                className="h-full w-auto"
                            />
                        </button>
                    )
                }

            </label>
        </>
    )
}

export default AuthenticationInput