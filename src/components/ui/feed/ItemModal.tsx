import { DetailedProduct, Product, Publication } from "@/types"
import React from "react"

interface ItemModalProps {
    item: Product | DetailedProduct | Publication | DetailedProduct
    onFavorite: () => void
}

const ItemModal: React.FC<ItemModalProps> = ({item, onFavorite}) => {
    
    const handleDownload = async() => {
        
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
        <div className="w-[15vw] z-40 relative h-fit py-4 px-2 animate-fade-down animate-duration-1000 animate-ease-in-out flex flex-col gap-6 bg-blue-8 rounded-xl shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] right-0">
                <div className="flex flex-col gap-1 items-start text-start text-blue-1 font-medium">
                    <button onClick={onFavorite} className="text-start hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md"> {Number(item.favorito) === 1? 'Remover dos favoritos' : 'Favoritar'} </button>
                    <button onClick={handleDownload} className="text-start hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md">Baixar imagem</button>
                    <button onClick={() => null} className="text-start text-blue-2 hover:bg-blue-2/20 ease-linear duration-150 w-full p-1 px-2 rounded-md">Salvar</button>
                </div>
        </div>
    )
}

export default ItemModal