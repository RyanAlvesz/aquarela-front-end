'use client'

import React from 'react';
import GradientButton from '@/components/ui/buttons/GradientButton';
import AuthenticationInput from '../inputs/AuthenticationInput';
import GoogleButton from '../buttons/GoogleButton';
import AuthenticationChoice from '../AuthenticationChoice'
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { User } from '@/types';
import alert, { loader, stopLoader } from '@/types/alert';
import { fetchWrapper } from '@/lib/api/fetch';
import { setUser } from '@/store/userSlice';
import { useRouter } from 'next/navigation';

const RegisterForm: React.FC = () => {

    const dispatch = useAppDispatch();
    const router = useRouter()

    const user: User & {validacao_senha: string} = {
        nome: useAppSelector((state) => state.input.name),
        nome_usuario: useAppSelector((state) => state.input.registerNickname),
        email: useAppSelector((state) => state.input.email),
        cpf: useAppSelector((state) => state.input.cpf).replace(/\D/g, ''),
        senha: useAppSelector((state) => state.input.registerPassword),
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

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if(passwordVerification()){

            loader()

            const url: string = 'v1/aquarela/user'

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: user.nome,
                    nome_usuario: user.nome_usuario,
                    foto_usuario: "",
                    descricao: "",
                    email: user.email,
                    senha: user.senha,
                    cpf: user.cpf,
                    data_nascimento: user.data_nascimento,
                    telefone: user.telefone,
                    disponibilidade: 0
                }),
            };

            interface getResp {
                usuario: User,
                status_code: number
                status: string
            }
            
            const resp = await fetchWrapper<getResp>(url, options)
            
            if (resp && resp.usuario) {
                dispatch(setUser(resp.usuario));
                stopLoader()
                router.push('/preferences')
            }

        }
        
    }

    return (
        <form onSubmit={registerUser} className='w-full flex flex-col gap-4 md:gap-y-5 md:gap-x-4 md:grid md:grid-cols-2'>
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
                name='registerNickname'
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
                name='registerPassword'
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
            <GradientButton className="w-full py-3 md:col-span-2" label='Cadastrar' primaryColor='blue-1' secundaryColor='blue-3' direction='left'/>
            <AuthenticationChoice />
            <GoogleButton text='Cadastre com o Google'/>
        </form>
    )
}

export default RegisterForm