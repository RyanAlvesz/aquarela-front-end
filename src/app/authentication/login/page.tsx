import { Metadata } from 'next'
import Login from "@/components/pages/Login"

export const metadata: Metadata = {
  title: 'Login',
  description: "Página de login",
}

const LoginPage = () => {
    return (
      <Login />
    );
}

export default LoginPage