import React from "react";
import GradientButton from "../buttons/GradientButton";
import PreferencesButtonGrid from "../PreferencesButtonGrid";
import PreferencesLogoText from "../PreferencesLogoText";
import { Category } from "@/types";
import { RootState, useAppSelector } from "@/store/store";
import { fetchWrapper } from "@/lib/api/fetch";
import alert, { loader } from "@/types/alert";

interface preferencesProps {
    categories: Category[]
}

const RegisterPreferences: React.FC<preferencesProps> = ({categories}) => {
    
    const selectedCategoryIds = useAppSelector((state: RootState) => state.selectedCategories.ids)   
    const  userResp = useAppSelector((state: RootState) => state.user)        
    
    interface categoriesPost {
        id_usuario: number
        categorias: number[]
    }

    const postInfo: categoriesPost = {
        id_usuario: userResp.id as number,
        categorias: selectedCategoryIds
    }

    const selectedCategoriesValidation = () => {
        if (selectedCategoryIds.length > 0)
            return true
        else {
            alert({icon:"warning", title:"Selecione pelo menos 1 categoria!"})
            return false
        }
    }

    const registerPreferences = async(e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postInfo
            }),
        };

        if(selectedCategoriesValidation()){

            loader()
            const url: string = 'v1/aquarela/'
            // const resp = await fetchWrapper(url, options)

            // console.log(resp);
            
        }

    }
    
    return (
        <form
            onSubmit={registerPreferences}
            className="grid grid-rows-[calc(16vh-3rem)_calc(84vh-6.5rem)_calc(4.5rem-2rem)] w-screen overflow-x-hidden min-h-screen bg-blue-7 px-[12.5vw] py-8 gap-6 
                        md:grid-rows-[calc(20vh-5vh)_calc(80vh-5vh-6rem)_calc(6rem-5vh)] md:bg-blue-8 md:py-[5vh] md:px-[7.5vh] md:gap-[2.5vh]">
            <PreferencesLogoText/>   
            <PreferencesButtonGrid categories={categories} />
            <GradientButton className="px-5 md:px-8 h-full place-self-end [&>p]:!text-body-mobile [&>p]:md:!text-body-desktop" direction="left" label="Próximo" primaryColor={'blue-1'} secundaryColor={'blue-2'}/>
        </form>
    )
}

export default RegisterPreferences;