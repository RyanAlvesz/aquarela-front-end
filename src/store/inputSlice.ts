import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IInputState {
    name: string;
    registerNickname: string;
    loginNickname: string;
    email: string;
    cpf: string;
    registerPassword: string;
    loginPassword: string;
    confirmPassword: string;
    birthday: string;
    telephone: string;
}

const inputInitialState: IInputState = {
    name: "",
    registerNickname: "",
    loginNickname: "",
    email: "",
    cpf: "",
    registerPassword: "",
    loginPassword: "",
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
            state.registerNickname = "";
            state.loginNickname = "";
            state.email = "";
            state.cpf = "";
            state.registerPassword = "";
            state.loginPassword = "";
            state.confirmPassword = "";
            state.birthday = "";
            state.telephone = "";
        },
    },
});

export const { setInputValue, resetInputs } = inputSlice.actions;
export const inputReducer = inputSlice.reducer;