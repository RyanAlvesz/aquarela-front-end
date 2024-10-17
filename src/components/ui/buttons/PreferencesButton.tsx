'use client'

import { toggleCategory } from "@/store/categoriesSlice";
import { useAppDispatch } from "@/store/store";
import { Category } from "@/types";
import React from "react";

interface preferencesButtonProps{
    category: Category
    isSelected: boolean
    selectedCategories: number[]
}

const PreferencesButton: React.FC<preferencesButtonProps> = ({category, selectedCategories, isSelected}) => {

    const dispatch = useAppDispatch()
    
    const changeValue = selectedCategories.indexOf(category.id) + 1;
    const handleToggleCategory = () => {
        dispatch(toggleCategory(category.id))
    }

    return (
        <button 
            onClick={handleToggleCategory}
            type="button"
            style={{backgroundImage: 'radial-gradient(rgba(144,193,206,0.8), rgba(184,206,212,0.8))'}}
            className="w-[35vw] h-[35vw] md:w-[calc((80vh-5vh-6rem-7.5vh)/3)] md:h-[calc((80vh-5vh-6rem-7.5vh)/3)] rounded-2xl flex items-center justify-center p-4 relative fade-animation">
                <p className="font-gloria text-center text-body-mobile md:text-[calc(0.25rem+1.5vh)] text-blue-2 w-full">
                    {category.nome}
                </p>
                {isSelected && (
                    <div className="bg-blue-2/30 rounded-2xl absolute inset-0 fade-animation">
                        <div className="flex items-center justify-center absolute -right-1 -top-1 md:-right-2 md:-top-2 bg-white rounded-full w-6 h-6 md:w-8 md:h-8 text-body-mobile md:text-body-desktop shadow-md font-ubuntu text-blue-2 font-bold">{changeValue}</div>
                    </div>
                )}
        </button>
    )
}

export default PreferencesButton;