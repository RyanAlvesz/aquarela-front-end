'use client'

import React from 'react';
import GradientButton from '@/components/ui/buttons/GradientButton';
import DinamicLabelInput from '../inputs/DinamicLabelInput';
import GoogleButton from '../buttons/GoogleButton';
import AuthenticationChoice from '../AuthenticationChoice'

const RegisterForm = () => {
    
    const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={registerUser} className='w-full flex flex-col gap-4 md:gap-y-5 2xl:gap-y-16 md:gap-x-4 2xl:gap-x-12 md:grid md:grid-cols-2'>
            <DinamicLabelInput 
                image='user'
                inputType='text'
                name='name'
                placeholder='Nome completo'
                required = {true}
            />
            <DinamicLabelInput 
                image='nickname'
                inputType='text'
                name='nickame'
                placeholder='Apelido'
                required = {true}
            />
            <DinamicLabelInput 
                image='mail'
                inputType='email'
                name='email'
                placeholder='E-mail'
                required = {true}
            />
            <DinamicLabelInput 
                image='cpf'
                inputType='text'
                name='cpf'
                placeholder='CPF'
                required = {true}
            />
            <DinamicLabelInput 
                image='passwordLock'
                inputType='password'
                name='password'
                placeholder='Senha'
                required = {true}
                passwordVisibility
            />
            <DinamicLabelInput 
                image='passwordLock'
                inputType='password'
                name='passwordConfirmation'
                placeholder='Confirme a senha'
                required = {true}
                passwordVisibility
            />
            <DinamicLabelInput 
                image='birthdayCake'
                inputType='date'
                name='birthday'
                placeholder='Data de Nascimento'
                required = {true}
            />
            <DinamicLabelInput 
                image='telephone'
                inputType='phone'
                name='telephone'
                placeholder='Telefone'
                required = {true}
            />
            <GradientButton label='Cadastrar' primaryColor='blue-1' secundaryColor='blue-3' direction='left'/>
            <AuthenticationChoice />
            <GoogleButton text='Cadastre com o Google'/>
        </form>
    )
}

export default RegisterForm