import React, { useEffect } from "react";
import GradientButton from "../buttons/GradientButton";
import PreferencesButtonGrid from "../layout/PreferencesButtonGrid";
import PreferencesLogoText from "../text/PreferencesLogoText";
import { Category } from "@/types";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { fetchWrapper } from "@/lib/api/fetch";
import alert, { loader, stopLoader } from "@/types/alert";
import ScrollButton from "../buttons/ScrollButton";
import { setScrollPosition } from "@/store/scrollSlice";
import { useRouter } from "next/navigation";

interface PreferencesProps {
    categories: Category[]
}

const RegisterPreferences: React.FC<PreferencesProps> = ({categories}) => {

    const selectedCategoryIds = useAppSelector((state: RootState) => state.selectedCategories.ids)   
    const userResp = useAppSelector((state: RootState) => state.user)        
    const scrollPosition = useAppSelector((state: RootState) => state.scroll.position); 

    const dispatch = useAppDispatch()
    const router = useRouter()

    const scrollLeft = () => {
        scrollPosition > 0 ? dispatch(setScrollPosition(scrollPosition - 600)) : dispatch(setScrollPosition(0))
    }

    const scrollRight = () => {
        dispatch(setScrollPosition(scrollPosition + 600));
    }

    useEffect(() => {
        const grid = document.querySelector('.preferences-button-grid'); 
        if (grid) {
            grid.scrollTo({ left: scrollPosition, behavior: 'smooth' })
        }
    }, [scrollPosition])

    interface categoriesPost {
        id_usuario: number
        preferencias: number[]
    }

    const postInfo: categoriesPost = {
        id_usuario: userResp.id as number,
        preferencias: selectedCategoryIds
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
                id_usuario: postInfo.id_usuario,
                preferencias: postInfo.preferencias
            }),
        };

        if(selectedCategoriesValidation()){
            
            loader()
            const url: string = 'v1/aquarela/preferences/user'
            const resp = await fetchWrapper(url, options)
            stopLoader()
            router.push('/home/feed') 
            
        }

    }
    
    return (
        <form
            onSubmit={registerPreferences}
            className="grid grid-rows-[calc(16vh-3rem)_calc(84vh-6.5rem)_calc(4.5rem-2rem)] relative w-screen overflow-x-hidden min-h-screen bg-blue-7 px-[12.5vw] py-8 gap-6 
                        md:grid-rows-[calc(20vh-5vh)_calc(80vh-5vh-6rem)_calc(6rem-5vh)] md:bg-blue-8 md:py-[5vh] md:px-[7.5vh] md:gap-[2.5vh]">
            <ScrollButton className="hidden md:flex absolute w-[4vh] h-[4vh] top-[calc(20.5vh+((80vh-5vh-6rem)/2))] left-[1.75vh]" onClick={scrollLeft} />
            <PreferencesLogoText/>   
            <PreferencesButtonGrid categories={categories} />
            <GradientButton className="px-5 md:px-8 h-full place-self-end [&>p]:!text-body-mobile [&>p]:md:!text-body-desktop" direction="left" label="Próximo" primaryColor={'blue-1'} secundaryColor={'blue-2'}/>
            <ScrollButton className="hidden md:flex absolute w-[4vh] h-[4vh] top-[calc(20.5vh+((80vh-5vh-6rem)/2))] right-[1.75vh] rotate-180" onClick={scrollRight}/>
        </form>
    )
}

export default RegisterPreferences;