'use client'

import ReturnButton from "@/components/ui/buttons/ReturnButton"
import DynamicFeed from "@/components/ui/feed/DynamicFeed"
import { fetchWrapper } from "@/lib/api/fetch"
import { RootState, useAppSelector } from "@/store/store"
import { Folder as IFolder } from "@/types"
import Image from "next/image"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import shareSVG from "$/public/images/svg/share.svg";
import editSVG from "$/public/images/svg/edit.svg";
import alert, { confirmAlert } from "@/types/alert"
import ConfigInput from "@/components/ui/inputs/ConfigInput"
import GradientButton from "@/components/ui/buttons/GradientButton"

interface getResp {
    pasta: IFolder
    status_code: number
    status: boolean
}

interface respDelete {
    status: boolean
    status_code: number
    message: string
}

interface respUpdate extends respDelete {
    nome: string
}

const FolderPage = () => {

    const [folder, setFolder] = useState<IFolder | null>(null)
    const [folderName, setFolderName] = useState<string>('Pasta não encontrada')
    const [folderInputName, setFolderInputName] = useState<string>('')
    const [currentUser, setCurrentUser] = useState<boolean>(false)
    const [isCreateFolderButton, setIsCreateFolderButton] = useState<boolean>(false)
    const user = useAppSelector((state: RootState) => state.user)
    const params = useParams()
    const router = useRouter()
    const pathname = usePathname()

    const fetchItems = async () => {

        const url: string = `v1/aquarela/folder?folder=${params.id}&client=${user.id}`

        const options: RequestInit = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-cache',
        }

        const resp = await fetchWrapper<getResp>(url, options)
        if (resp.status && resp.pasta) {
            setFolder(resp.pasta)
            setFolderName(resp.pasta.nome)
            setFolderInputName(resp.pasta.nome)
            setCurrentUser(resp.pasta.id_usuario == user.id ? true : false)
        } else {
            setFolder(null)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])

    const handleShare = async () => {
        await navigator.clipboard.writeText('https://aquarela-front-end.vercel.app' + pathname)
        alert({
            icon: 'success',
            title: 'Pasta copiada para área de trasnferência'
        })
    }

    const handleEdit = () => {
        setIsCreateFolderButton(prev => !prev)
        setFolderInputName(folderName)
    }

    const updateFolder = async() => {

        if(folderName !== folderInputName){
            
            const url: string = 'v1/aquarela/folder/' + folder?.id_pasta
    
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: folderInputName
                }),
            }
    
            const resp = await fetchWrapper<respUpdate>(url, options)

            if(resp.status = true){
                setFolderName(resp.nome)
                alert({
                    icon: 'success',
                    title: 'Pasta atualizada com sucesso'
                })
            }

        } else {
            setIsCreateFolderButton(prev => !prev)
        }

    }

    const deleteFolder = async() => {

        const alertResp: boolean = await confirmAlert(
            {
                title: 'Tem certeza que realmente excluir essa pasta?',
                icon: 'warning',
                description: 'Você perderá seus itens salvos',
                confirmBtn: 'Excluir',
                declineBtn: 'Cancelar'
            }
        )
      
        if (alertResp) {

            const url: string = 'v1/aquarela/folders/' + folder?.id_pasta

            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            const resp = await fetchWrapper<respDelete>(url, options)
            
            if(resp.status == true){
                router.back()
            }else{
                alert({
                    icon:'error',
                    title: 'Erro ao excluir pasta'
                })
            }

        }

    }

    return (
        <main className="w-full flex flex-col justify-center items-center gap-6 pb-6 md:pb-16">
            <nav className="flex items-center justify-between p-4 pb-0 md:px-6 w-full md:w-4/5">
                <div className="flex items-center justify-center gap-3 md:gap-2 md:flex-col md:items-start">
                    <div className="md:hidden flex items-center justify-center">
                        <ReturnButton color="darkBlue" width={6} className={`md:!w-[4.5vh] z-0 relative`} />
                    </div>
                    <h1
                        className={`text-xl md:text-3xl text-blue-1 font-medium bg-transparent w-4/5 md:w-full md:grow`}
                    > {folderName} </h1>
                    {folder?.itens && folder.itens.length > 0 && (<span className="hidden md:flex text-blue-1 text-xl"> {folder.itens.length} {folder.itens.length == 1 ? 'item salvo' : 'itens salvos'} </span>)}
                </div>
                <div className="md:flex gap-4 items-center justify-center">
                    <button
                        className={`${currentUser ? 'hidden md:flex' : 'flex'} items-center justify-center`}
                        onClick={handleShare}
                    >
                        <Image
                            alt="Compartilhar"
                            src={shareSVG}
                            width={50}
                            height={50}
                            className="w-auto h-8"
                        />
                    </button>
                    {currentUser && (
                        <button
                            className="flex items-center justify-center"
                            onClick={handleEdit}
                        >
                            <Image
                                alt="Editar"
                                src={editSVG}
                                width={50}
                                height={50}
                                className={`w-auto h-8`}
                            />
                        </button>
                    )}
                </div>
            </nav>
            {folder?.itens && folder.itens.length > 0 ? (
                <DynamicFeed
                    feed={folder.itens}
                    infoArea={"like"}
                    className="!bg-transparent w-full md:!w-[80vw] md:!min-w-0 md:!grid-cols-[repeat(auto-fill,minmax(calc((80vw-2rem)/4),1fr))]"
                    itemSize={(vw) => {
                        return (vw * 0.8) / 4
                    }}
                    deleteFolder={folder}
                    refreshItems={fetchItems}
                />
            ) : (
                <div className="flex items-center justify-center text-base md:text-xl text-center font-medium text-blue-1 p-6"> As publicações salvas ficarão aqui </div>
            )}
            {isCreateFolderButton && (
                <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-screen z-[999] bg-black/30"
                    onClick={() => setIsCreateFolderButton(false)}
                >
                    <form
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={(e) => {
                            e.preventDefault()
                            updateFolder()
                        }}
                        className="bg-blue-7 w-[90vw] md:w-[35vw] rounded-2xl flex flex-col items-center h-fit p-8 py-12"
                    >
                        <h2 className="text-2xl md:text-3xl text-blue-1 font-bold mb-6">Atualizar pasta</h2>
                        <ConfigInput label="Nome" onChange={setFolderInputName} type="text" value={folderInputName} className="md:[&>label]:text-2xl md:[&>input]:text-xl md:[&>input]:h-14" maxLength={100} required />
                        <div className="grid grid-cols-2 gap-4 w-full mt-6">
                            <GradientButton type="submit" direction="bottom" label="Salvar" primaryColor={"blue-1"} secundaryColor={"blue-1"} className="w-full [&>p]:!text-lg md:[&>p]:!text-2xl p-2 md:p-0 md:h-14"/>
                            <GradientButton type="button" direction="bottom" label="Excluir pasta" primaryColor={"blue-2"} secundaryColor={"blue-2"} className="w-full [&>p]:!text-lg md:[&>p]:!text-2xl p-2 md:p-0 md:h-14" onClick={deleteFolder} />
                        </div>
                    </form>
                </div>
            )}
        </main>
    )
}

export default FolderPage