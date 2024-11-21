'use client'

import Folder from "@/components/ui/buttons/Folder"
import GradientButton from "@/components/ui/buttons/GradientButton"
import ConfigInput from "@/components/ui/inputs/ConfigInput"
import ProfileMessage from "@/components/ui/text/ProfileMessage"
import { fetchWrapper } from "@/lib/api/fetch"
import { RootState, useAppSelector } from "@/store/store"
import { BaseUser, DetailedUser, Folder as IFolder } from "@/types"
import { loader, stopLoader } from "@/types/alert"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ProfileFolders = () => {

  const profile = useAppSelector((state: RootState) => state.profile.user as BaseUser & DetailedUser)
  const user = useAppSelector((state: RootState) => state.user)
  const [isCreateFolderButton, setIsCreateFolderButton] = useState<boolean>(false)
  const [folderName, setFolderName] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (loading) {
      loader()
    }
  }, [loading])

  const openCreateFolderButton = () => {
    setIsCreateFolderButton(true)
  }

  const createFolder = async() => {

    if (folderName != '') {
      setLoading(true)

      const url: string = 'v1/aquarela/folder'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: folderName,
          id_usuario: user.id
        }),
      }

      interface getResp {
        pasta: IFolder,
        status_code: number
        status: string
      }

      const resp = await fetchWrapper<getResp>(url, options)

      if (resp && resp.status_code == 201) {
        stopLoader()
        handleLink(resp.pasta)
      }

    }
  }

  const handleLink = (folder: IFolder) => {
    router.push('/home/folder/' + folder.id_pasta)
  }

  return (
    <main className="relative grid gap-4 px-4 pb-4 grid-cols-[repeat(auto-fill,minmax(calc((100vw-4rem)/3),1fr))] md:grid-cols-[repeat(3,minmax(0,calc(25vw/3)))]">
      {user.id === profile.id && (
        <Folder createButton onClick={openCreateFolderButton}></Folder>
      )}
      {profile.pastas != undefined && profile.pastas.length > 0 ? (
        profile.pastas.map((folder) => (
          <Folder key={folder.id_pasta} folder={folder} onClick={() => handleLink(folder)} />
        ))
      ) : (
        profile.id !== user.id && (
          <ProfileMessage message="O usuário ainda não criou nenhuma pasta." />
        )
      )}
      {isCreateFolderButton && (
        <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-screen z-[999] bg-black/30"
          onClick={() => setIsCreateFolderButton(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => e.preventDefault()}
            className="bg-blue-7 w-[90vw] md:w-[35vw] rounded-2xl flex flex-col items-center h-fit p-8"
          >
            <h2 className="text-2xl md:text-3xl text-blue-1 font-bold mb-6">Criar pasta</h2>
            <ConfigInput label="Nome" onChange={setFolderName} type="text" value={folderName} className="md:[&>label]:text-2xl md:[&>input]:h-12" maxLength={100} required />
            <GradientButton direction="bottom" label="Salvar" primaryColor={"blue-1"} secundaryColor={"blue-1"} className="w-full md:w-1/2 [&>p]:!text-lg md:[&>p]:!text-2xl p-2 mt-4" onClick={createFolder} />
          </form>
        </div>
      )}
    </main>
  )

}

export default ProfileFolders
