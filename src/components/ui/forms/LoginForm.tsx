'use client'

import AuthenticationChoice from "../text/AuthenticationChoice"
import AuthenticationInput from "../inputs/AuthenticationInput"
import GradientButton from "../buttons/GradientButton";
import GoogleButton from "../buttons/GoogleButton";
import { fetchWrapper } from "@/lib/api/fetch";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { User } from "@/types";
import alert, { loader, stopLoader } from "@/types/alert";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";

const LoginForm = () => {

    const dispatch = useAppDispatch()
    const router = useRouter()

    interface LoginUser {
        login: string
        senha: string
    }

    const user: LoginUser = {
        login: useAppSelector((state) => state.input.loginNickname),
        senha: useAppSelector((state) => state.input.loginPassword)
    }

    interface respProps{
        status: boolean
        status_code: number
        message: string
        usuario: User[]
    }

    const emailValidation = async() => {
        const url = 'v1/aquarela/authentication/user/email'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.login,
                senha: user.senha
            }),
        };
        const resp = await fetchWrapper<respProps>(url, options)
        return resp
    }

    const nicknameValidation = async() => {
        const url = 'v1/aquarela/authentication/user/name'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: user.login,
                senha: user.senha
            }),
        };
        const resp = await fetchWrapper<respProps>(url, options)
        return resp
    }

    const login = async(e: React.FormEvent<HTMLFormElement>) => {

        loader()
        e.preventDefault()

        const emailResp = await emailValidation()
        const nicknameResp = await nicknameValidation()

        if(emailResp.status){
            dispatch(setUser(emailResp.usuario[0]))  
            stopLoader()
            router.push('/home/feed')          
        }else if(nicknameResp.status){
            dispatch(setUser(nicknameResp.usuario[0]))
            stopLoader()
            router.push('/home/feed')
        }else{
            alert({icon:"error", title:"Usuário não encontrado!"})
        }

    }
    
    return (
        <form onSubmit={login} className='w-full flex flex-col gap-6 md:gap-y-5 md:gap-x-4'>
            <AuthenticationInput
                image="user"
                inputType="text"
                maxChar={150}
                name="loginNickname"
                placeholder="Usuário ou email"
                required
            />
            <AuthenticationInput
                image="passwordLock"
                inputType="password"
                maxChar={150}
                name="loginPassword"
                placeholder="Senha"
                required
                passwordVisibility
            />
            <GradientButton className="w-full py-3 md:col-span-2" label='Login' primaryColor='blue-2' secundaryColor='blue-3' direction='right'/>
            <AuthenticationChoice/>
            <GoogleButton text='Entre com o Google'/>
        </form>
    )
}

export default LoginForm