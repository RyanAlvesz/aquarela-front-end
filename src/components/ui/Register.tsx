'use client'

import ReduxProvider from "@/store/redux-provider"
import AuthenticationTitle from '@/components/ui/AuthenticationTitle';
import AuthenticationForm from '@/components/ui/forms/RegisterForm';

const Register = () => {
    return (
        <ReduxProvider>
            <main className="flex flex-col items-center px-4 pb-4 gap-4 md:bg-blue-8 md:justify-center md:px-[6vw] md:gap-6 md:py-9 md:max-h-screen md:overflow-scroll">
                <AuthenticationTitle title='Cadastre-se' subtitle='Crie uma nova conta' />
                <AuthenticationForm />
            </main>
        </ReduxProvider>
    )
}

export default Register