'use client'

import Folder from "@/components/ui/buttons/Folder"
import ProfileMessage from "@/components/ui/text/ProfileMessage"
import { RootState, useAppSelector } from "@/store/store"
import { BaseUser, DetailedUser } from "@/types"

const ProfileFolders = () => {

  const profile = useAppSelector((state: RootState) => state.profile.user as BaseUser & DetailedUser)
  const user = useAppSelector((state: RootState) => state.user)    

  return (
    <main className="relative grid gap-4 px-4 pb-4 grid-cols-[repeat(auto-fill,minmax(calc((100vw-4rem)/3),1fr))] md:grid-cols-[repeat(3,minmax(0,calc(25vw/3)))]">
        {user.id === profile.id && (
          <Folder createButton></Folder>
        )}
        {profile.pastas != undefined && profile.pastas.length > 0? (
          profile.pastas.map((folder)=> {return <Folder key={folder.id} folder={folder}/>})
        ) : (
          profile.id !== user.id && (
            <ProfileMessage message="O usuário ainda não criou nenhuma pasta." />
          )
        )}
      </main>
  )

}

export default ProfileFolders
  