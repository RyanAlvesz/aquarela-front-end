'use client'

import DynamicFeed from "@/components/ui/feed/DynamicFeed"
import ProfileMessage from "@/components/ui/text/ProfileMessage"
import { RootState, useAppSelector } from "@/store/store"
import { Product, Publication, BaseUser, DetailedUser } from "@/types"

const Profile = () => {

  const profile = useAppSelector((state: RootState) => state.profile.user as BaseUser & DetailedUser)
  
    return (
      <div className="flex items-center justify-center relative w-full">
        {profile.publicacoes == undefined || profile.publicacoes.length == 0? (
          <ProfileMessage message={'Ainda não há nada para mostrar. As publicações ficarão salvas aqui!'}/>
        ) : (
          <DynamicFeed
            feed={profile.publicacoes as (Product | Publication)[]}
            infoArea = {false}
            className="!bg-transparent md:!w-[60vw] md:!min-w-0"
          />
        )}
      </div>
    )
}

export default Profile
  