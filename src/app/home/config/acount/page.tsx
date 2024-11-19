'use client'

import ConfigTitle from "@/components/ui/buttons/ConfigTitle"
import GradientButton from "@/components/ui/buttons/GradientButton"
import ConfigInput from "@/components/ui/inputs/ConfigInput"
import { fetchWrapper } from "@/lib/api/fetch"
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import { BaseUser } from "@/types"
import { useEffect, useState } from "react"
import { DateTime } from 'luxon'
import alert from "@/types/alert"
import { setUser } from "@/store/userSlice"

interface usersResp {
  usuarios: BaseUser[]
}

const ConfigAcount = () => {

  const user = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [cpf, setCPF] = useState('')
  const [birth, setBirth] = useState('')
  const [phone, setPhone] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [users, setUsers] = useState<BaseUser[]>([])

  const formatPhoneNumber = (value: string) => {
    const cleanedInput = value.replace(/\D/g, '')
    const match = cleanedInput.match(/^(\d{2})(\d{5})(\d{0,4})?$/)
    if (match) {
      return `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}`
    }
    return value
  }

  const formatCPF = (input: string): string => {
    const cleanedInput = input.replace(/\D/g, '')
    const match = cleanedInput.match(/^(\d{3})(\d{3})(\d{3})(\d{0,2})?$/)
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}${match[4] ? '-' + match[4] : ''}`
    }
    return input
  }

  const validatePhoneNumber = (phone: string): boolean => {
    const cleanedPhone = phone.replace(/\D/g, '')
    if (cleanedPhone.length !== 11) {
        alert({ icon: 'warning', title: 'Telefone deve ter 11 dígitos.' })
        return false
    }
    return true
}

const validateCPF = (cpf: string): boolean => {
    const cleanedCPF = cpf.replace(/\D/g, '')
    if (cleanedCPF.length !== 11) {
        alert({ icon: 'warning', title: 'CPF deve ter 11 dígitos.' })
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

  const duplicatedInfo = (): boolean => {
    let resp = true
    users.forEach((registeredUser) => {
        if (
            email === registeredUser.email && registeredUser.email !== user.email
        ) {
            alert({icon:'warning', title:'Email já cadastrado'})
            resp = false
        } else if (
          cpf === registeredUser.cpf && registeredUser.cpf !== user.cpf
        ) {
          alert({icon:'warning', title:'CPF já cadastrado'})
          resp = false
        } else if (
          phone === registeredUser.telefone && registeredUser.telefone !== user.telefone
        ) {
          alert({icon:'warning', title:'Telefone já cadastrado'})
          resp = false
        }
    })
    return resp
  }

  const updateValidation = () => {
    if(email == '' || cpf == '' || phone == '' || birth == '') {
      alert({icon:'warning', title:'Informações obrigatórias não preenchidas.'})
      return false
    }
    return true
  }

  const validatePassword = (): boolean => {
    if (newPassword || passwordConfirmation) {
      if (newPassword.length < 6) {
        alert({ icon: 'warning', title: 'A senha deve ter pelo menos 6 caracteres.' })
        return false
      }
      if (newPassword !== passwordConfirmation) {
        alert({ icon: 'warning', title: 'As senhas não coincidem.' })
        return false
      }
    }
    return true
  }

  interface respProps {
    status: boolean
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault() 

    if (!validatePhoneNumber(phone)) return
    if (!validateCPF(cpf)) return
    if(updateValidation() && duplicatedInfo() && validatePassword()){

      const cleanedPhone = phone.replace(/\D/g, '')
      const cleanedCPF = cpf.replace(/\D/g, '') 

      const updatedUser: BaseUser = {
        ...user,
        ...(email && { email: email }),          
        ...(cpf && { cpf: cleanedCPF }),            
        ...(phone && { telefone: cleanedPhone }),
        ...(birth && { data_nascimento: birth }),
      }

      const url: string = 'v1/aquarela/user/' + updatedUser.id
    
      const options = {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              nome: updatedUser.nome,
              nome_usuario: updatedUser.nome_usuario,
              foto_usuario: updatedUser.foto_usuario,
              descricao: updatedUser.descricao,
              email: updatedUser.email,
              ...(newPassword && { senha: newPassword }),
              cpf: updatedUser.cpf,
              data_nascimento: updatedUser.data_nascimento,
              telefone: updatedUser.telefone,
              disponibilidade: updatedUser.disponibilidade
          })
      }          

      const resp = await fetchWrapper<respProps>(url, options)
      
      if(resp.status == true){
        alert({icon:'success', title:'Perfil atualizado com sucesso'})
        dispatch(setUser(updatedUser))
      }else{
        alert({icon:'error', title:'Erro ao atualizar'})
      }

    }

  }

  useEffect(() => {
    
    const loadUserInfo = () => {

      const birthDate = user.data_nascimento
      const parsedDate = DateTime.fromFormat(birthDate, 'dd-MM-yyyy')

      if (parsedDate.isValid) {
        setBirth(parsedDate.toFormat("yyyy-MM-dd"));
      } else {
        setBirth(birthDate);
      }

      setEmail(user.email)
      setCPF(formatCPF(user.cpf))
      setPhone(formatPhoneNumber(user.telefone))
    }

    loadUserInfo()

  }, [user])

  return (
    <main className="bg-blue-7 min-h-screen flex justify-center p-4 md:py-8 md:bg-transparent md:h-fit md:grow">
      <div className="flex flex-col gap-6 md:gap-12 w-full md:w-1/3">
        <ConfigTitle text="Gerenciar conta" returnButton desktopReturnButton />
        <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-8 md:justify-start md:gap-6 w-full px-4 md:p-0 grow">
          <div className="flex flex-col gap-3 w-full">
            <ConfigInput value={email} onChange={setEmail} required label="Email" type="email" />
            <ConfigInput value={cpf} onChange={(value) => setCPF(formatCPF(value))} maxLength={14} required label="CPF" type="text" />
            <ConfigInput value={birth} onChange={setBirth} label="Data de nascimento" required type="date" />
            <ConfigInput value={phone} onChange={(value) => setPhone(formatPhoneNumber(value))} maxLength={15} required label="Telefone" type="text" />
            <ConfigInput value={newPassword} onChange={setNewPassword} label="Redefinir senha" type="password" />
            <ConfigInput value={passwordConfirmation} onChange={setPasswordConfirmation} label="Confirme a senha" type="password" />
          </div>
          <GradientButton className="w-full h-14 [&>p]:!text-xl" direction="left" label="Salvar" primaryColor='blue-1' secundaryColor='blue-2' />
        </form>
      </div>
    </main>
  )
}

export default ConfigAcount
