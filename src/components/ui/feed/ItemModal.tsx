'use client'

import { fetchWrapper } from "@/lib/api/fetch"
import { RootState, useAppSelector } from "@/store/store"
import { DetailedProduct, Folder, Product, Publication } from "@/types"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import addSVG from '$/public/images/svg/plus.svg'
import Link from "next/link"
import alert from "@/types/alert"

interface ItemModalProps {
    item: Product | DetailedProduct | Publication | DetailedProduct
    onFavorite: () => Promise<boolean>
    createFolder: (v: boolean) => void
}

interface FoldersResp {
    status: boolean
    status_code: number
    message: string
    pastas: Folder[]
}

const ItemModal: React.FC<ItemModalProps> = ({ item, onFavorite, createFolder }) => {

    const [favorite, setFavorite] = useState(Boolean(Number(item.favorito)))
    const [saveItem, setSaveItem] = useState<boolean>(false)
    const [folders, setFolders] = useState<Folder[]>([])
    const currentUser = useAppSelector((state: RootState) => state.user)

    const handleFavorite = async () => {
        const resp = await onFavorite()
        setFavorite(resp)
    }

    const fetchFolders = async () => {
        const url: string = `v1/aquarela/folders/user/` + currentUser.id

        const options: RequestInit = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-cache',
        }

        const resp = await fetchWrapper<FoldersResp>(url, options)
        if (resp) {
            setFolders(resp.pastas)
        }

    }

    const handleSaveItem = () => {
        setSaveItem(true)
    }

    const postSaveItem = async (folder: Folder) => {

        let resp

        if (item.tipo == 'produto') {
            const url: string = 'v1/aquarela/folders/products'
            const options: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_produto: item.id_publicacao,
                    id_pasta: folder.id_pasta
                })
            }
            resp = await fetchWrapper(url, options)
        } else {
            const url: string = 'v1/aquarela/folders/posts'
            const options: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_postagem: item.id_publicacao,
                    id_pasta: folder.id_pasta
                })
            }
            resp = await fetchWrapper(url, options)
        }

        if (resp) {

            alert({
                icon: 'success',
                title: 'Item adicionado com sucesso'
            })
        }

    }

    useEffect(() => {
        fetchFolders()
    })

    const handleDownload = async () => {

        for (let i = 0; i < item.imagens.length; i++) {
            const image = item.imagens[i]
            try {
                const response = await fetch(image.url)
                const blob = await response.blob()
                const link = document.createElement('a')
                const url = URL.createObjectURL(blob)
                link.href = url
                link.download = `${item.nome}_${i + 1}.jpg`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                URL.revokeObjectURL(url)
            } catch (error) {
                console.error(`Erro ao baixar a imagem ${i + 1}:`, error)
            }
        }

    }

    return (
        <div className="relative">
            {!saveItem ? (
                <div className="w-[65vw] md:w-[15vw] z-40 relative h-fit py-4 px-2 animate-fade-down animate-duration-1000 animate-ease-in-out flex flex-col gap-6 bg-blue-8 rounded-xl shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] right-0">
                    <div className="flex flex-col gap-1 items-start text-start text-blue-1 font-medium">
                        <button onClick={handleFavorite} className="text-start hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md"> {favorite ? 'Desfavoritar' : 'Favoritar'} </button>
                        <button onClick={handleDownload} className="text-start hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md">Baixar imagem</button>
                        <button onClick={handleSaveItem} className="text-start text-blue-2 hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md">Salvar</button>
                    </div>
                </div>
            ) : (
                <div className="w-[85vw] md:w-[25vw] z-50 relative h-fit animate-fade animate-duration-1000 animate-ease-in-out flex flex-col bg-blue-8 rounded-xl shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] right-0">
                    <div className="flex flex-col w-full items-start py-4 pb-0 px-4 text-start text-blue-1 font-medium">
                        {folders.length > 0 ? (
                            <div className="w-full flex flex-col gap-2">
                                <h3 className="w-full text-center text-xl text-blue-1 font-bold"> Salvar </h3>
                                <div className="flex flex-col max-h-[30vh] overflow-y-scroll [&>div:last-child]:pb-5">
                                    {
                                        folders.map((folder) => {
                                            return (
                                                <div key={folder.id_pasta} className="py-3 mt-2 rounded-md flex items-center text-lg gap-2">
                                                    <Link href={'/home/folder/' + folder.id_pasta} className="grow">{folder.nome}</Link>
                                                    <button onClick={() => postSaveItem(folder)} className="px-3 py-1 h-full bg-blue-1 hover:bg-blue-2 ease-linear duration-100 rounded-md text-white"> Salvar </button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className="py-8 px-4 text-xl font-medium"> Você ainda não possui nenhuma pasta </div>
                        )}
                    </div>
                    <button
                        className="flex items-center gap-4 shadow-[0_-8px_8px_0px_rgba(0,0,0,0.1)] w-full py-5 px-4 h-fit"
                        onClick={() => createFolder(true)}
                    >
                        <div className="bg-blue-1 h-12 w-12 p-2 rounded-xl flex items-center justify-center">
                            <Image
                                alt="Criar pasta"
                                src={addSVG}
                                width={100}
                                height={100}
                                className="h-full w-full"
                            />
                        </div>
                        <span className="text-xl text-blue-1 font-medium"> Criar pasta </span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default ItemModal