'use client'

import ReduxProvider from "@/store/redux-provider"
import AuthenticationTitle from '@/components/ui/text/AuthenticationTitle';
import LoginBackground from "../ui/background/LoginBackground";
import LoginForm from "../ui/forms/LoginForm";

const Login = () => {
    return (
        <ReduxProvider>
            <main className="flex flex-col items-center pt-[calc(25vh-6vh-2rem)] px-4 pb-4 gap-6 md:bg-blue-8 md:justify-center md:px-[8vw] md:py-9 md:max-h-screen md:overflow-scroll">
                <LoginBackground/>
                <AuthenticationTitle title='Bem-vindo!' subtitle='Faça login na sua conta' />
                <LoginForm/>
            </main>
        </ReduxProvider>
    )
}

export default Login