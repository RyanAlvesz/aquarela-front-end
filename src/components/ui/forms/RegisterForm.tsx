'use client'

import React from 'react';
import GradientButton from '@/components/ui/buttons/GradientButton';
import AuthenticationInput from '../inputs/AuthenticationInput';
import GoogleButton from '../buttons/GoogleButton';
import AuthenticationChoice from '../AuthenticationChoice'
import { useAppSelector } from "@/store/store";
import { User } from '@/types';
import alert, { loader } from '@/types/alert';

const RegisterForm = () => {
    
    const user: User & {validacao_senha: string} = {
        nome: useAppSelector((state) => state.input.name),
        nome_usuario: useAppSelector((state) => state.input.nickname),
        email: useAppSelector((state) => state.input.email),
        cpf: useAppSelector((state) => state.input.cpf).replace(/\D/g, ''),
        senha: useAppSelector((state) => state.input.password),
        validacao_senha: useAppSelector((state) => state.input.confirmPassword),
        data_nascimento: useAppSelector((state) => state.input.birthday),
        telefone: useAppSelector((state) => state.input.telephone).replace(/\D/g, ''),
    }

    const passwordVerification = (): boolean => {
        if (user.senha != user.validacao_senha){
            alert({icon:'warning', title:'Senhas diferentes'})
            return false
        }else
            return true
    }

    const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(passwordVerification()){
            loader()
        }
    }

    return (
        <form onSubmit={registerUser} className='w-full flex flex-col gap-4 md:gap-y-5 2xl:gap-y-16 md:gap-x-4 2xl:gap-x-12 md:grid md:grid-cols-2'>
            <AuthenticationInput 
                image='user'
                inputType='text'
                name='name'
                placeholder='Nome completo'
                required = {true}
                maxChar={150}
            />
            <AuthenticationInput 
                image='nickname'
                inputType='text'
                name='nickname'
                placeholder='Apelido'
                required = {true}
                maxChar={150}
            />
            <AuthenticationInput 
                image='mail'
                inputType='email'
                name='email'
                placeholder='E-mail'
                required = {true}
                maxChar={50}
            />
            <AuthenticationInput 
                image='cpf'
                inputType='text'
                name='cpf'
                placeholder='CPF'
                required = {true}
                maxChar={14}
            />
            <AuthenticationInput 
                image='passwordLock'
                inputType='password'
                name='password'
                placeholder='Senha'
                required = {true}
                passwordVisibility
                maxChar={50}
            />
            <AuthenticationInput 
                image='passwordLock'
                inputType='password'
                name='confirmPassword'
                placeholder='Confirme a senha'
                required = {true}
                passwordVisibility
                maxChar={50}
            />
            <AuthenticationInput 
                image='birthdayCake'
                inputType='date'
                name='birthday'
                placeholder='Data de Nascimento'
                required = {true}
                maxChar={8}
            />
            <AuthenticationInput 
                image='telephone'
                inputType='phone'
                name='telephone'
                placeholder='Telefone'
                required = {true}
                maxChar={15}
            />
            <GradientButton label='Cadastrar' primaryColor='blue-1' secundaryColor='blue-3' direction='left'/>
            <AuthenticationChoice />
            <GoogleButton text='Cadastre com o Google'/>
        </form>
    )
}

export default RegisterForm