'use client'

import DynamicFeed from "@/components/ui/feed/DynamicFeed"
import ProfileMessage from "@/components/ui/text/ProfileMessage"
import { fetchWrapper } from "@/lib/api/fetch"
import { RootState, useAppSelector } from "@/store/store"
import { DetailedProduct, DetailedPublication } from "@/types"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface GetResp {
  itens: (DetailedProduct | DetailedPublication) []
  status: boolean
}

const ProfileFavorites = () => {

  const currentUser = useAppSelector((state: RootState) => state.user)
  const [favoriteItens, setFavoriteItens] = useState<(DetailedProduct | DetailedPublication) []>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const noCurrentUser = () => {
      if (currentUser.nome_usuario !== params.nickname) {
        router.back()
      }
    }
    noCurrentUser()
  }, [currentUser.nome_usuario, params.nickname, router])

  useEffect(() => {

    const url = 'v1/aquarela/favorite/user/' + currentUser.id

    const options: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    }

    const fetchFeedItems = async () => {
      const resp = await fetchWrapper<GetResp>(url, options)
      if (resp.status == true) {
        setFavoriteItens(resp.itens)        
      }
      setIsLoading(false)
    }

    fetchFeedItems()

  }, [currentUser])  

  return (
    <main className="flex items-center justify-center relative w-full">
      {isLoading ? (
        <ProfileMessage message={'Carregando...'} />
      ) : favoriteItens.length === 0 ? (
        <ProfileMessage message={'Sua lista de favoritos está vazia! Comece a salvar o que mais gosta'} />
      ) : (
        <DynamicFeed
          feed={favoriteItens}
          infoArea={"favorite"}
          className="!bg-transparent md:!w-[60vw] md:!min-w-0 md:!grid-cols-[repeat(auto-fill,minmax(calc((60vw-2rem)/3),1fr))]"
          itemSize={(vw) => {
            return (vw * 0.6) / 3
          }}
        />
      )}
    </main>
  )

}

export default ProfileFavorites
