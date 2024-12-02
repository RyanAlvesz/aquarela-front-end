import React from "react"
import CreateItemCheckbox from "../inputs/CreateItemCheckbox"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { toggleFilter, IFilterState } from "@/store/filterSlice";

const FilterPopover: React.FC = () => {

    const dispatch = useAppDispatch();
    const { produto, postagem, disponivel } = useAppSelector((state) => state.filter)

    const handleToggleFilter = (filterKey: keyof IFilterState) => {
        dispatch(toggleFilter(filterKey));
    }

    return(
        <div className="w-[15vw] z-40 relative h-fit py-4 px-2 animate-fade-down animate-duration-1000 animate-ease-in-out flex flex-col gap-6 bg-blue-8 mr-2 mt-4 rounded-xl shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] right-0">
            <CreateItemCheckbox checked={produto} label="Produtos" setChecked={() => handleToggleFilter("produto")} />
            <CreateItemCheckbox checked={postagem} label="Postagens" setChecked={() => handleToggleFilter("postagem")} />
            <CreateItemCheckbox checked={disponivel} label="Artista disponível" setChecked={() => handleToggleFilter("disponivel")} />
        </div>
    )
}

export default FilterPopover