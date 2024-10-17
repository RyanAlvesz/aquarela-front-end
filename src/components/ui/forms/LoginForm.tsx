'use client'

import AuthenticationChoice from "../AuthenticationChoice"
import AuthenticationInput from "../inputs/AuthenticationInput"
import GradientButton from "../buttons/GradientButton";
import GoogleButton from "../buttons/GoogleButton";

const LoginForm = () => {
    
    const login = () => {}
    
    return (

        <form onSubmit={login} className='w-full flex flex-col gap-6 md:gap-y-5 md:gap-x-4'>
            <AuthenticationInput
                image="user"
                inputType="text"
                maxChar={150}
                name="nickname"
                placeholder="Usuário ou email"
                required
            />
            <AuthenticationInput
                image="passwordLock"
                inputType="password"
                maxChar={150}
                name="password"
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