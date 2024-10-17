'use client'

import { Category } from "@/types";
import React from "react";
import PreferencesButton from "./buttons/PreferencesButton";
import { RootState, useAppSelector } from "@/store/store";

interface preferencesButtonGridProps {
    categories: Category[]
}

const PreferencesButtonGrid: React.FC<preferencesButtonGridProps> = ({categories}) => {    

    const selectedCategoryIds = useAppSelector((state: RootState) => state.selectedCategories.ids)      

    return (
        <div className="grid grid-cols-2 md:grid-flow-col scroll-smooth md:grid-cols-none md:grid-rows-3 gap-[5vw] md:gap-[2.5vh] py-2 rounded-2xl overflow-y-scroll md:overflow-y-hidden md:overscroll-x-scrool">
            {categories.map((category)=>{
                const isSelected = selectedCategoryIds.includes(category.id)
                return (
                    <PreferencesButton 
                        key={category.id}
                        isSelected={isSelected}
                        selectedCategories={selectedCategoryIds} 
                        category={category}
                    />
                )
            })}
        </div>
    )
}

export default PreferencesButtonGrid;