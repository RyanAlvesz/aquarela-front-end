'use client'

import { Category } from "@/types";
import ReduxProvider from "@/store/redux-provider";
import React from "react";
import RegisterPreferences from "../ui/forms/RegisterPreferences";

interface preferencesProps {
    categories: Category[]
}

const Preferences: React.FC<preferencesProps> = ({categories}) => {
    
    return (
        <ReduxProvider>
            <RegisterPreferences categories={categories} />
        </ReduxProvider>
    )

}

export default Preferences;