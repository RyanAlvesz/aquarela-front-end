'use client'

import React, {useState} from "react";
import Image from "next/image";
import birthdayCake from '/public/images/svg/birthday-cake.svg'
import cpf from '/public/images/svg/cpf.svg'
import mail from '/public/images/svg/mail.svg'
import passwordLock from '/public/images/svg/password-lock.svg'
import telephone from '/public/images/svg/telephone.svg'
import user from '/public/images/svg/user.svg'
import nickname from '/public/images/svg/nickname.svg'
import eyeOpen from '/public/images/svg/eye-open.svg'
import eyeClosed from '/public/images/svg/eye-closed.svg'

const icons = {
    birthdayCake,
    cpf,
    mail,
    passwordLock,
    telephone,
    user,
    nickname
}

interface dinamicLabelInputProps {
    placeholder: string
    inputType: 'text' | 'password' | 'email' | 'phone' | 'date'
    required: boolean
    name: string
    image: keyof typeof icons
    passwordVisibility?: boolean
}

const DinamicLabelInput: React.FC<dinamicLabelInputProps> = ({placeholder, inputType, required, name, image, passwordVisibility}) => {
    
    const [currentInputType, setCurrentInputType] = useState(inputType)
    const [isPasswordVisible, setIsPasswordVisible] = useState(passwordVisibility)
  
    const iconSrc = icons[image];
  
    const passwordVisibilityToggle = () => {
      setCurrentInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
      setIsPasswordVisible((prevVisibility) => !prevVisibility);
    }
    

    return (
        <>        
            <label 
                className="flex items-center w-full text-body-mobile p-2 2xl:p-6 gap-2 2xl:gap-8 rounded-md 2xl:rounded-3xl h-12 md:h-[6.5vh] md:text-body-desktop 2xl:text-7xl text-blue-2 bg-blue-5/90"
            >
                <Image 
                    src={iconSrc}
                    alt={name}
                    className="h-4/5 w-auto"
                />
                <input 
                    type={currentInputType}
                    placeholder={placeholder}
                    name={name}
                    required={required}
                    className="w-full bg-transparent placeholder:text-blue-2 placeholder:text-body-mobile md:placeholder:text-body-desktop 2xl:placeholder:text-7xl"
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

export default DinamicLabelInput