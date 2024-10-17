import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
    id?: number;
    nome: string;
    nome_usuario: string;
    foto_usuario?: string;
    descricao?: string;
    email: string;
    senha: string;
    cpf: string;
    data_nascimento: string; 
    telefone: string;
    disponibilidade?: boolean;
}

const initialUserState: IUser = {
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
        setUser: (state, action: PayloadAction<IUser>) => {
            return { ...state, ...action.payload };
        },
        setUserValue: (
            state,
            action: PayloadAction<{ field: keyof IUser; value: string | boolean | number | undefined }>
        ) => {
            const { field, value } = action.payload;
            if (field in state) {
                (state[field] as typeof value) = value;
            }
        },
        resetUser: (state) => {
            return initialUserState; 
        },
    },
});

export const { setUserValue, setUser, resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
