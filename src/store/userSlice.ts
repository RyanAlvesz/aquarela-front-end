import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialUserState: User = {
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
        setUser: (state, action: PayloadAction<User>) => {
            return { ...state, ...action.payload };
        },
        setUserValue: (
            state,
            action: PayloadAction<{ field: keyof User; value: string | boolean | number | undefined }>
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
