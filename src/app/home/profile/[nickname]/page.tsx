'use client'

import DynamicFeed from "@/components/ui/feed/DynamicFeed"
import { RootState, useAppSelector } from "@/store/store"
import { Product, Publication, BaseUser, DetailedUser } from "@/types"

const Profile = () => {

  const user = useAppSelector((state: RootState) => state.profile.user as BaseUser & DetailedUser)
  
    return (
      <DynamicFeed
        feed={user.publicacoes as (Product | Publication)[]}
        infoArea = {false}
      />
    )
}

export default Profile
  