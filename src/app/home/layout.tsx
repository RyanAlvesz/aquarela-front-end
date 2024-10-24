'use client'

import MobileNavigation from "@/components/ui/navigation/MobileNavigation"
import ReduxProvider from "@/store/redux-provider"
import { User } from "@/types";

let user: User

const HomeLayout = ({children}: {children: React.ReactNode}) => {
    user = {
        cpf: '',
        data_nascimento: '',
        email: '', 
        nome: '',
        nome_usuario: '',
        senha: '',
        telefone:''
    }
    
    return(
        <ReduxProvider>
            <div className="bg-blue-7 h-screen">
                <MobileNavigation user={user}/>
            </div>
        </ReduxProvider>
    )
}

export default HomeLayout