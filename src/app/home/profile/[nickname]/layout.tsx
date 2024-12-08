'use client'

import DynamicTabContent from "@/components/ui/navigation/DynamicTabContent"
import MobileNavigation from "@/components/ui/navigation/MobileNavigation"
import MobileProfileOptions from "@/components/ui/navigation/MobileProfileOptions"
import LoadingMessage from "@/components/ui/utils/LoadingMessage"
import UserProfileCard from "@/components/ui/utils/UserProfileCard"
import { fetchWrapper } from "@/lib/api/fetch"
import { setProfile } from "@/store/profileSlice"
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import { ProfileUser } from "@/types"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

interface GetResp {
  usuario: ProfileUser
}

const ProfileLayout = ({children}: {children: React.ReactNode}) => {
  
  const [userInfo, setUserInfo] = useState<ProfileUser>({} as ProfileUser);
  const currentUser = useAppSelector((state: RootState) => state.user)
  const router = useRouter()
  
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const dispatch = useAppDispatch()

  const userProfileValidation = currentUser.nome_usuario === params.nickname? true : false
  const secondaryButton = userProfileValidation ? 'config' : 'share'

  const url = `v1/aquarela/nickname/user/?nickname=${params.nickname}&client=${currentUser.id}`

  useEffect(() => {

    const options: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    }

    const fetchFeedItems = async () => {
      const resp = await fetchWrapper<GetResp>(url, options)
      if(resp.usuario){
        setUserInfo(resp.usuario)
        dispatch(setProfile(resp.usuario))       
        setLoading(false)
      }else{
        router.push('/home/profile/' + currentUser.nome_usuario)
      }
    }

    fetchFeedItems()
    
  }, [url, dispatch, currentUser, router])
  
  return (
    <div className="flex flex-col items-center pt-8 md:pt-0 min-h-full grow">
      {loading ? (
        <LoadingMessage message="Carregando usuário"/>
      ) : (
        <>
          <MobileProfileOptions secondaryButton={secondaryButton} />
          <UserProfileCard isCurrentUser={userProfileValidation} currentUser={currentUser} currentUserId={currentUser.id as number} user={userInfo} />
          <DynamicTabContent currentUser={userProfileValidation} userNickname={userInfo.nome_usuario}>
            {children}
          </DynamicTabContent>
          <MobileNavigation />
        </>
      )}
    </div>
  )
}

export default ProfileLayout
  