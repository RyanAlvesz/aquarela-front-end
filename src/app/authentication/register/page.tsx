import { Metadata } from 'next'
import Register from '@/components/ui/Register';

export const metadata: Metadata = {
  title: 'Cadastro',
  description: "Página de cadastro",
}

const RegisterPage = () => {
  return (
    <Register />
  );
}

export default RegisterPage