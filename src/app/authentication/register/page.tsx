import { Metadata } from 'next'
import AuthenticationTitle from '@/components/ui/AuthenticationTitle';
import AuthenticationForm from '@/components/ui/forms/RegisterForm';

export const metadata: Metadata = {
  title: 'Cadastro',
  description: "Página de cadastro",
}

const Register = () => {

  return (
      <main className="flex flex-col items-center px-4 pb-4 gap-4 md:gap-6 2xl:gap-24 md:bg-blue-8 md:rounded-2xl 2xl:rounded-[50px] md:h-fit md:w-[40vw] 2xl:w-[35vw] md:px-10 2xl:px-36 md:py-12 2xl:py-40 md:place-self-center md:justify-center md:drop-shadow-[0px_0px_25px] shadow-blue-1">
        <AuthenticationTitle title='Cadastre-se' subtitle='Crie uma nova conta' />
        <AuthenticationForm />
      </main>
    );
}

export default Register