'use client'

import ConfigTitle from "@/components/ui/buttons/ConfigTitle"
import GradientButton from "@/components/ui/buttons/GradientButton"
import standardProfile from "$/public/images/paintings/standard-profile-picture.jpg";
import { RootState, useAppSelector } from "@/store/store"
import Image, { StaticImageData } from "next/image"
import { useEffect, useState } from "react"
import ConfigInput from "@/components/ui/inputs/ConfigInput";
import { uploadImage } from "@/lib/firebase/app";
import alert from "@/types/alert";
import { BaseUser } from "@/types";
import { fetchWrapper } from "@/lib/api/fetch";

interface usersResp {
  usuarios: BaseUser[]
}

const ConfigProfile = () => {
  
  const user = useAppSelector((state: RootState) => state.user)
  
  const [alt, setAlt] = useState('')
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [description, setDescription] = useState('')
  const [isImageUploaded, setIsImageUploaded] = useState(true)
  const [newProfilePicture, setNewProfilePicture] = useState('')
  const [users, setUsers] = useState<BaseUser[]>([])
  const [profileImage, setProfileImage] = useState<string | StaticImageData>(standardProfile)
  
  const handleImageChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file){
      setIsImageUploaded(false)
      const url = await uploadImage(file, '/user/' + id)
      if(url){
        setProfileImage(url)
        setNewProfilePicture(url)
        setIsImageUploaded(true)
      } else {
        alert({icon:'error', title:'Erro ao enviar imagem'})
      }
    }
  }

  useEffect(() => {        
    const fetchUsers = async () => {
        const resp = await fetchWrapper<usersResp>('v1/aquarela/users')
        setUsers(resp.usuarios)
    }
    fetchUsers()
  }, [])

  const duplicatedNickname = (): boolean => {
    let resp = true
    users.forEach((registeredUser) => {
        if (
            nickname === registeredUser.nome_usuario && registeredUser.nome_usuario !== user.nome_usuario
        ) {
            alert({icon:'warning', title:'Apelido já cadastrado'})
            resp = false
        }
    })
    return resp
}

  const updateValidation = () => {
    if(name == '' || nickname == '') {
      alert({icon:'warning', title:'Nome e apelido são obrigatórios.'})
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault() 

    if(updateValidation() && duplicatedNickname()){
      
      const updatedUser: BaseUser = {
        ...user,
        ...(name && { nome: name }),
        ...(nickname && { nome_usuario: nickname }),
        descricao: description,
        foto_usuario: newProfilePicture,
      }

      const url: string = 'v1/aquarela/user/' + updatedUser.id

      console.log({
        nome: updatedUser.nome,
        nome_usuario: updatedUser.nome_usuario,
        foto_usuario: updatedUser.foto_usuario,
        descricao: updatedUser.descricao,
        email: updatedUser.email,
        cpf: updatedUser.cpf,
        data_nascimento: updatedUser.data_nascimento,
        telefone: updatedUser.telefone,
        disponibilidade: updatedUser.disponibilidade
    });
      

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
              senha: updatedUser.senha,
              cpf: updatedUser.cpf,
              data_nascimento: updatedUser.data_nascimento,
              telefone: updatedUser.telefone,
              disponibilidade: updatedUser.disponibilidade
          })
      }

      const resp = await fetchWrapper(url, options)
      console.log(resp);
      
    }  
  }

  useEffect(() => {

    setAlt(user.nome)
    setId(user.id as number)

    const loadUserInfo = () => {
      setName(user.nome)
      setNickname(user.nome_usuario)
      setDescription(user.descricao || '')
      if(user.foto_usuario){
        setProfileImage(user.foto_usuario)
      } else {
        setProfileImage(standardProfile)
      }
    }

    loadUserInfo()

  }, [user])

  return (
    <main className="bg-blue-7 h-screen flex justify-center p-4 md:pt-8 md:bg-transparent md:h-auto md:grow">
      <div className="flex flex-col gap-4 md:gap-12 w-full md:w-1/3">
        <ConfigTitle text="Editar perfil" returnButton desktopReturnButton/>
        <form onSubmit={handleSubmit} className="flex flex-col justify-between md:justify-start md:gap-6 w-full px-4 md:p-0 grow">
            <div className="flex flex-col items-center justify-between gap-6">
              <label htmlFor="profilePicture" className="flex flex-col w-fit items-center justify-center gap-3 relative">
                <Image 
                  priority
                  alt={alt}
                  src={profileImage}
                  width={100}
                  height={100}
                  className="rounded-full w-[13vh] h-[13vh] md:w-[10vh] md:h-[10vh]" 
                />
                <div className="w-full text-center text-sm bg-blue-1 text-white rounded-md font-medium py-[6px] md:text-base">Alterar</div>
                <input onChange={handleImageChange} type="file" accept="image/*" name="profilePicture" id="profilePicture" className="hidden" />
                {!isImageUploaded && (
                  <div className="flex items-center absolute top-0 justify-center w-[13vh] h-[13vh] md:w-[10vh] md:h-[10vh]">
                    <div className="image-loader"></div>
                  </div>
                )}
              </label>
              <div className="flex flex-col gap-3 w-full">
                <ConfigInput value={name} onChange={setName} label="Nome" type="text"/>
                <ConfigInput value={nickname} onChange={setNickname} label="Apelido" type="text"/>
                <ConfigInput value={description} onChange={setDescription} label="Biografia" type="text"/>
              </div>
            </div>
            <GradientButton className="w-full h-12 md:h-[6vh] [&>p]:!text-xl" direction="right" label="Salvar" primaryColor='blue-1' secundaryColor='blue-2'/>
        </form>
      </div>
    </main>
  )
}

export default ConfigProfile
  