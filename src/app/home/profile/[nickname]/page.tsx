'use client'

import DynamicFeed from "@/components/ui/feed/DynamicFeed"
import ProfileMessage from "@/components/ui/text/ProfileMessage"
import { RootState, useAppSelector } from "@/store/store"
import { Product, Publication, BaseUser, DetailedUser } from "@/types"

const Profile = () => {

  const profile = useAppSelector((state: RootState) => state.profile.user as BaseUser & DetailedUser)
  const currentUser = useAppSelector((state: RootState) => state.user)
  const isCurrentUser = profile.id === currentUser.id
  
    return (
      <div className="flex items-center justify-center relative w-full">
        {profile.publicacoes == undefined || profile.publicacoes.length == 0? (
          <ProfileMessage message={'Ainda não há nada para mostrar. As publicações ficarão salvas aqui!'}/>
        ) : (
          <DynamicFeed
            feed={profile.publicacoes as (Product | Publication)[]}
            infoArea = {false}
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
  