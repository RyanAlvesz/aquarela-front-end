import { Address } from "@/types"
import React, { useState } from "react"
import Popover, { PopoverContent, PopoverTrigger } from "./Popover"
import optionsSVG from "$/public/images/svg/options.svg"
import Image from "next/image"
import alert, { confirmAlert } from "@/types/alert"
import { fetchWrapper } from "@/lib/api/fetch"

interface AddressCardProps {
    address: Address
    refresh: () => void
    edit: (arg: Address) => void
}

const AddressCard: React.FC<AddressCardProps> = ({ address, refresh, edit }) => {

    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [isOptionsOpen, setOptionsOpen] = useState(false)

    const handleDelete = async() => {

        const alertResp: boolean = await confirmAlert(
            {
              title: `Deletar endereço?`,
              icon: 'warning',
              description: 'Essa ação não poderá ser desfeita',
              confirmBtn: 'Deletar',
              declineBtn: 'Cancelar'
            }
          )
      
          if (alertResp) {
            const url: string = 'v1/aquarela/delete/address/' + address.id_endereco
            const options: RequestInit = {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              }
            }
            const resp = await fetchWrapper(url, options)
            if (resp) {
              alert({
                icon: 'success',
                title: 'Endereço deletado com sucesso'
              })
              refresh()
            }
          }
    }

    const handleEdit = () => {
        setIsHovered(false)
        setOptionsOpen(false)
        edit(address)
    }

    const formatCEP = (cep: string): string => {
        return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')
    }

    return (
        <div
            className="text-blue-1 relative md:text-xl md:text-blue-2 flex flex-col justify-center font-medium p-3 gap-1 w-full border md:border-2 border-blue-1 rounded-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                if (!isOptionsOpen) setIsHovered(false);
            }}
        >
            <p className="font-bold md:text-blue-1">{address.logradouro} - N°{address.numero_casa}</p>
            <p>{address.bairro} · {formatCEP(address.cep)}</p>
            <p>{address.cidade}, {address.estado}</p>
            {address.complemento && (
                <p>{address.complemento}</p>
            )}
            {isHovered && (
                <Popover placement="bottom-start" open={isOptionsOpen} onOpenChange={(open) => {
                    setOptionsOpen(open)
                    if (!open) {
                        setIsHovered(false)
                    }
                }}>
                    <PopoverTrigger asChild onClick={() => setOptionsOpen((v) => !v)}>
                        <div className="absolute flex cursor-pointer items-center justify-center top-2 right-3">
                            <Image
                                src={optionsSVG}
                                alt="Opções"
                                width={200}
                                height={200}
                                className="h-6 w-auto"
                            />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="w-[65vw] md:w-[15vw] z-40 relative h-fit py-4 px-2 animate-fade-down animate-duration-1000 animate-ease-in-out flex flex-col gap-6 bg-blue-8 rounded-xl shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] right-0">
                            <div className="flex flex-col gap-1 items-start text-start text-blue-1 font-medium">
                                <button onClick={handleEdit} className="text-start hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md">Editar</button>
                                <button onClick={handleDelete} className="text-start text-blue-2 hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md">Excluir</button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    )
}

export default AddressCard