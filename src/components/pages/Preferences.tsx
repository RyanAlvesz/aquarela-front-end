'use client'

import { Category } from "@/types";
import ReduxProvider from "@/store/redux-provider";
import React from "react";
import RegisterPreferences from "../ui/forms/RegisterPreferences";
import { fetchWrapper } from '@/lib/api/fetch'
import { useEffect, useState } from 'react'

interface GetResp {
    categorias: Category[]
}

const Preferences: React.FC = () => {
    
    const [categories, setCategories] = useState<Category[]>([])

    const url = 'v1/aquarela/categories'
    const options: RequestInit = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const resp = await fetchWrapper<GetResp>(url, options)
            setCategories(resp.categorias || [])
        }
        fetchCategories()
    }, [])

    return (
        <ReduxProvider>
            <RegisterPreferences categories={categories} />
        </ReduxProvider>
    )

}

export default Preferences;