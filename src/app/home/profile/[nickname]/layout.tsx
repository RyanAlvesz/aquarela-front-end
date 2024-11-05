'use client'

import DynamicTabContent from "@/components/ui/navigation/DynamicTabContent"
import MobileNavigation from "@/components/ui/navigation/MobileNavigation"
import MobileProfileOptions from "@/components/ui/navigation/MobileProfileOptions"
import UserProfileCard from "@/components/ui/utils/UserProfileCard"
import { fetchWrapper } from "@/lib/api/fetch"
import { setProfile } from "@/store/profileSlice"
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import { User } from "@/types"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

interface GetResp {
  usuario: User[]
}

const testUser: User = {
  id: 1,
    nome: "João Silva",
    nome_usuario: "joaosilva",
    foto_usuario: "https://firebasestorage.googleapis.com/v0/b/tcc-aquarela.appspot.com/o/1989-36.jpeg?alt=media&token=330aaa3e-00cd-41d0-a985-7042f79df60c",
    descricao: "Sou um artista apaixonado por pintura e design gráfico.",
    email: "joao.silva@example.com",
    senha: "senhaSegura123",
    cpf: "123.456.789-00",
    data_nascimento: "1990-01-01",
    telefone: "(11) 91234-5678",
    disponibilidade: true,
    avaliacao: 4.5,
    seguidores: 150,
    seguindo: 75,
    qnt_publicacoes: 2, // Atualizado para refletir o número de publicações
    publicacoes: [
        {
            tipo: "postagem",
            id_publicacao: 4,
            nome: "Arte na Praia",
            descricao: "Uma arte muito bela",
            item_digital: null,
            marca_dagua: null,
            preco: null,
            quantidade: null,
            id_dono_publicacao: 1,
            curtida: false,
            preferencia: true,
            imagens: [
                {
                    id_imagem: 5,
                    url: "https://firebasestorage.googleapis.com/v0/b/tcc-aquarela.appspot.com/o/1989-36.jpeg?alt=media&token=330aaa3e-00cd-41d0-a985-7042f79df60c"
                }
            ]
        },
        {
            tipo: "produto",
            id_publicacao: 1,
            nome: "Peixes",
            descricao: "Um quadro muito bonito.",
            item_digital: true, // Mudado para booleano
            marca_dagua: true, // Mudado para booleano
            preco: 10000,
            quantidade: 1,
            id_dono_publicacao: 2,
            curtida: false, // Mudado para booleano
            preferencia: true,
            imagens: [
                {
                    id_imagem: 1,
                    url: "https://firebasestorage.googleapis.com/v0/b/tcc-aquarela.appspot.com/o/1989-2.jpeg?alt=media&token=4deefd49-9489-4cb5-9d3d-fdc5cc165013"
                },
                {
                    id_imagem: 2,
                    url: "https://firebasestorage.googleapis.com/v0/b/tcc-aquarela.appspot.com/o/1989-28.jpeg?alt=media&token=0cf1dc3f-95ed-4686-b7c3-93c6fb7d7979"
                }
            ]
        },
    ], 
    pastas: [
      {
        id: 1,
        nome: '1989'
      },
      {
        id: 2,
        nome: 'Midnights'
      }
    ] 
}

const ProfileLayout = ({children}: {children: React.ReactNode}) => {

  const [userInfo, setUserInfo] = useState<(User)[]>([]);
  const currentUser = useAppSelector((state: RootState) => state.user)
  
  const params = useParams()
  
  const dispatch = useAppDispatch()
  dispatch(setProfile(testUser))       

  const userProfileValidation = currentUser.nome_usuario === params.nickname? true : false
  const secondaryButton = userProfileValidation ? 'config' : 'share'

  const url = 'v1/aquarela/user/' + params.nickname

  useEffect(() => {

    const options: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    }

    const fetchFeedItems = async () => {
      const resp = await fetchWrapper<GetResp>(url, options)
      setUserInfo(resp.usuario || [])
    }
    fetchFeedItems()
    
  }, [url])
  
  return (
    <div className="flex flex-col items-center pt-8 min-h-full">
      <MobileProfileOptions secondaryButton={secondaryButton} />
      <UserProfileCard currentUser={userProfileValidation} currentUserId={currentUser.id as number} user={testUser} />
      <DynamicTabContent currentUser={userProfileValidation} userNickname={testUser.nome_usuario}>
        {children}
      </DynamicTabContent>
      <MobileNavigation />
    </div>
  )
}

export default ProfileLayout
  