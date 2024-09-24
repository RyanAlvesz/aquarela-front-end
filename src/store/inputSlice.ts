import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IInputState {
    name: string;
    nickname: string;
    email: string;
    cpf: string;
    password: string;
    confirmPassword: string;
    birthday: string;
    telephone: string;
}

const inputInitialState: IInputState = {
    name: "",
    nickname: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    telephone: "",
}

export const inputSlice = createSlice({
    name: "inputs",
    initialState: inputInitialState,
    reducers: {
        setInputValue: (
            state,
            action: PayloadAction<{ field: keyof IInputState; value: string }>
        ) => {
            const { field, value } = action.payload
            state[field] = value
        },
        resetInputs: (state) => {
            state.name = "";
            state.nickname = "";
            state.email = "";
            state.cpf = "";
            state.password = "";
            state.confirmPassword = "";
            state.birthday = "";
            state.telephone = "";
        },
    },
});

export const { setInputValue, resetInputs } = inputSlice.actions;
export const inputReducer = inputSlice.reducer;