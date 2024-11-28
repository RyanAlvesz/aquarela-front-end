import { Category } from "@/types"
import Image from "next/image"
import React from "react"
import closeSVG from '$/public/images/svg/plus-blue.svg'

interface SelectedCategoryProps {
    category: Category
    removeItem: () => void
}

const SelectedCategory: React.FC<SelectedCategoryProps> = ({category, removeItem}) => {
    return(
        <div className="flex items-center justify-center rounded-full gap-1 bg-blue-2/20 border border-blue-2/40 p-2 h-12 w-fit">
            <span className="text-blue-2 text-[100%]">{category.nome}</span>
            <button 
                onClick={removeItem} 
                className="h-full flex items-center justify-center"
            >
                <Image
                    src={closeSVG}
                    alt="Excluir"
                    width={100}
                    height={100}
                    className="h-4/5 w-auto rotate-45"
                />
            </button>
        </div>
    )
}

export default SelectedCategory