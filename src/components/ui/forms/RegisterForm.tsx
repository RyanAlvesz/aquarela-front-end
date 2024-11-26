'use client'

import React, { useEffect, useState } from 'react';
import GradientButton from '@/components/ui/buttons/GradientButton';
import AuthenticationInput from '../inputs/AuthenticationInput';
import GoogleButton from '../buttons/GoogleButton';
import AuthenticationChoice from '../text/AuthenticationChoice'
import { useAppDispatch, useAppSelector } from "@/store/store";
import { BaseUser } from '@/types';
import alert, { loader, stopLoader } from '@/types/alert';
import { fetchWrapper } from '@/lib/api/fetch';
import { setUser } from '@/store/userSlice';
import { useRouter } from 'next/navigation';

interface usersResp {
    usuarios: BaseUser[]
}

const RegisterForm: React.FC = () => {

    const dispatch = useAppDispatch();
    const router = useRouter()

    const [users, setUsers] = useState<BaseUser[]>([])

    const user: BaseUser & {validacao_senha: string} = {
        nome: useAppSelector((state) => state.input.name),
        nome_usuario: useAppSelector((state) => state.input.registerNickname),
        email: useAppSelector((state) => state.input.email),
        cpf: useAppSelector((state) => state.input.cpf).replace(/\D/g, ''),
        senha: useAppSelector((state) => state.input.registerPassword),
        validacao_senha: useAppSelector((state) => state.input.confirmPassword),
        data_nascimento: useAppSelector((state) => state.input.birthday),
        telefone: useAppSelector((state) => state.input.telephone).replace(/\D/g, ''),
    }

    const validateForm = (): boolean => {

        const isEmpty = Object.entries(user).some(([key, value]) => {            
            if (key !== "foto_usuario" && key !== "descricao") {
                return !value || value.trim() === "";
            }
            return false;
        })
    
        if (isEmpty) {
            alert({ icon: 'warning', title: 'Por favor, preencha todos os campos obrigatórios.' });
            return false
        }
    
        if (user.senha && user.senha.length < 3) {
            alert({ icon: 'warning', title: 'A senha deve ter no mínimo 3 caracteres.' });
            return false
        }

        return true
    }

    useEffect(() => {        
        const fetchUsers = async () => {
            const resp = await fetchWrapper<usersResp>('v1/aquarela/users')
            setUsers(resp.usuarios)
        }
        fetchUsers()
    }, [])

    const alreadyRegisteredInfoValidation = (): boolean => {
        
        let response = true
        
        users.forEach((registeredUser) => {
            if(
                user.cpf === registeredUser.cpf
            ){                
                alert({icon:'warning', title:'CPF já cadastrado'})
                response = false
            } else if (
                user.nome_usuario === registeredUser.nome_usuario
            ) {
                alert({icon:'warning', title:'Apelido já cadastrado'})
                response = false
            } else if (
                user.email === registeredUser.email
            ) {
                alert({icon:'warning', title:'E-mail já cadastrado'})
                response = false
            }
        })

        return response
    }

    const passwordVerification = (): boolean => {
        if (user.senha != user.validacao_senha){
            alert({icon:'warning', title:'Senhas diferentes'})
            return false
        } else {
            return true
        } 
    }

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()        

        if(!validateForm()){
            return
        }

        if(passwordVerification() && alreadyRegisteredInfoValidation()){

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
                usuario: BaseUser,
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
                placeholder='Nome de usuário'
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
                minChar={14}
                maxChar={14}
            />
            <AuthenticationInput 
                image='passwordLock'
                inputType='password'
                name='registerPassword'
                placeholder='Senha'
                required = {true}
                passwordVisibility
                minChar={3}
                maxChar={50}
            />
            <AuthenticationInput 
                image='passwordLock'
                inputType='password'
                name='confirmPassword'
                placeholder='Confirme a senha'
                required = {true}
                passwordVisibility
                minChar={3}
                maxChar={50}
            />
            <AuthenticationInput 
                image='birthdayCake'
                inputType='date'
                name='birthday'
                placeholder='Data de Nascimento'
                required = {true}
                minChar={8}
                maxChar={8}
            />
            <AuthenticationInput 
                image='telephone'
                inputType='phone'
                name='telephone'
                placeholder='Telefone'
                required = {true}
                minChar={15}
                maxChar={15}
            />
            <GradientButton className="w-full py-3 md:col-span-2" label='Cadastrar' primaryColor='blue-1' secundaryColor='blue-3' direction='left'/>
            <AuthenticationChoice />
            <GoogleButton text='Cadastre com o Google'/>
        </form>
    )
}

export default RegisterForm