'use client'

import Folder from "@/components/ui/buttons/Folder"
import { RootState, useAppSelector } from "@/store/store"
import { BaseUser } from "@/types"

const ProfileFolders = () => {

  const user = useAppSelector((state: RootState) => state.profile.user as BaseUser)

  return (
      <main className="grid gap-4 px-4 grid-cols-[repeat(auto-fill,minmax(calc((100vw-4rem)/3),1fr))]">
        {user.pastas && (
          user.pastas.map((folder)=> {return <Folder folder={folder}/>})
        )}
        <Folder createButton></Folder>
      </main>
  )

}

export default ProfileFolders
  