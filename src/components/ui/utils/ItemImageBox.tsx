'use client'

import { DetailedProduct, DetailedPublication, Folder as IFolder } from "@/types"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import Popover, { PopoverContent, PopoverTrigger } from "./Popover"
import ItemModal from "../feed/ItemModal"
import optionsSVG from "$/public/images/svg/options-white.svg"
import { loader, stopLoader } from "@/types/alert"
import { RootState, useAppSelector } from "@/store/store"
import { fetchWrapper } from "@/lib/api/fetch"
import ConfigInput from "../inputs/ConfigInput"
import GradientButton from "../buttons/GradientButton"
import watermarkImage from "$/public/images/logo/watermark.png"

interface ItemImageBoxProps {
    item: DetailedPublication | DetailedProduct
    onFavorite: () => Promise<boolean>
    setIsCreateFolderButton: (arg: boolean) => void
    isCreateFolderButton: boolean
}

const ItemImageBox: React.FC<ItemImageBoxProps> = ({ item, onFavorite, setIsCreateFolderButton, isCreateFolderButton }) => {

    const [isOptionsOpen, setOptionsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const currentUser = useAppSelector((state: RootState) => state.user)
    const [folderName, setFolderName] = useState<string>('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (loading) {
            loader()
        }
    }, [loading])

    const createFolder = async () => {

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
                    id_usuario: currentUser.id
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
                setIsCreateFolderButton(false)
                setFolderName('')
            }

        }

    }

    return (
        <>
            <div
                className="h-auto md:min-w-[calc((100vw-13vw-1.5rem)/8)] md:max-h-[80vh] md:max-w-[calc((100vw-13vw-1.5rem)/2)] md:place-self-end md:self-start flex justify-end overflow-hidden relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    if (!isOptionsOpen) setIsHovered(false)
                }}
            >
                <Image
                    src={item.imagens[0].url}
                    alt={item.nome}
                    width={1000}
                    height={1000}
                    priority
                    className="h-full w-fit max-h-full shadow-inner object-cover md:rounded-2xl"
                />
                {item.tipo === 'produto' && Boolean(item.marca_dagua) && (
                    <div
                    className={`flex items-center justify-center absolute inset-0 rounded-md md:rounded-2xl pointer-events-none`}
                    >
                    <div
                        className="absolute bg-cover inset-0  w-[165%] h-[165%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12"
                        style={{
                            backgroundImage: `url(${watermarkImage.src})`
                        }}
                    />
                    </div>
                )}
                {
                    isHovered && (
                        <div className="hidden md:flex justify-end ease-linear animate-fade overflow-hidden p-2 rounded-xl absolute inset-0 bg-black/40">
                            <Popover open={isOptionsOpen} onOpenChange={(open) => {
                                setOptionsOpen(open);
                                if (!open) {
                                    setIsHovered(false)
                                }
                            }}>
                                <PopoverTrigger asChild onClick={() => setOptionsOpen((v) => !v)}>
                                    <button
                                        className="w-[8vh] h-[8vh] flex items-center justify-center"
                                    >
                                        <Image
                                            alt="Opções"
                                            src={optionsSVG}
                                            width={100}
                                            height={100}
                                            className="w-[55%] h-auto"
                                        />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <ItemModal
                                        item={item}
                                        onFavorite={onFavorite}
                                        createFolder={setIsCreateFolderButton}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    )
                }
            </div>
            {isCreateFolderButton && (
                <div className="fixed top-0 left-0 flex animate-fade animate-duration-1000 animate-ease-in-out items-center justify-center h-screen w-screen z-[999] bg-black/30"
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
        </>
    )
}

export default ItemImageBox