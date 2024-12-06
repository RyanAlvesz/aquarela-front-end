'use client'

import DynamicFeed from "@/components/ui/feed/DynamicFeed"
import ProfileMessage from "@/components/ui/text/ProfileMessage"
import { fetchWrapper } from "@/lib/api/fetch"
import { setProfile } from "@/store/profileSlice"
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import { Product, Publication, BaseUser, DetailedUser, ProfileUser } from "@/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface GetResp {
  usuario: ProfileUser
}

const Profile = () => {

  const params = useParams()
  const profile = useAppSelector((state: RootState) => state.profile.user as BaseUser & DetailedUser)
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state: RootState) => state.user)
  const isCurrentUser = profile.id === currentUser.id
  const [publications, setPublications] = useState<(Product | Publication)[]>([])

  useEffect(() => {
    setPublications(profile.publicacoes as (Product | Publication)[])
  }, [profile])

  const fetchItems = async() => {

    const url = `v1/aquarela/nickname/user/?nickname=${params.nickname}&client=${currentUser.id}`

    const options: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    }

    const resp = await fetchWrapper<GetResp>(url, options)

    if(resp.usuario){
      dispatch(setProfile(resp.usuario))       
    }

  }
  
    return (
      <div className="flex items-center justify-center relative w-full">
        {profile.publicacoes == undefined || profile.publicacoes.length == 0? (
          <ProfileMessage message={'Ainda não há nada para mostrar. As publicações ficarão salvas aqui!'}/>
        ) : (
          <DynamicFeed
            feed={publications}
            infoArea = {false}
            refreshItems={fetchItems}
            className="!bg-transparent md:!w-[60vw] md:!min-w-0 md:!grid-cols-[repeat(auto-fill,minmax(calc((60vw-2rem)/3),1fr))]"
            itemSize={(vw) => {
              return (vw * 0.6) / 3
            }}
            {...(isCurrentUser && {deleteItem: true} )}
          />
        )}
      </div>
    )
}

export default Profile
  