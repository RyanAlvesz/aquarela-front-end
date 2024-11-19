import { BaseUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialUserState: BaseUser = {
    id: undefined,
    nome: "",
    nome_usuario: "",
    foto_usuario: undefined,
    descricao: undefined,
    email: "",
    senha: "",
    cpf: "",
    data_nascimento: "",
    telefone: "",
    disponibilidade: undefined,
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setUser: (state, action: PayloadAction<BaseUser>) => {
            return { ...state, ...action.payload };
        },
        setUserValue: (
            state,
            action: PayloadAction<{ field: keyof BaseUser; value: string | boolean | number | undefined }>
        ) => {
            const { field, value } = action.payload;
            if (field in state) {
                (state[field] as typeof value) = value;
            }
        },
        resetUser: () => {
            return initialUserState; 
        },
    },
});

export const { setUserValue, setUser, resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
