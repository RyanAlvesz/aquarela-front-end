import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRememberMeState {
    rememberMe: boolean
}

const rememberMeInitialState: IRememberMeState = {
    rememberMe: false,
};

export const rememberMeSlice = createSlice({
    name: "rememberMe",
    initialState: rememberMeInitialState,
    reducers: {
        setRememberMe: (state, action: PayloadAction<boolean>) => {
            state.rememberMe = action.payload;
        },
        resetRememberMe: (state) => {
            state.rememberMe = false
        },
    },
});

export const { setRememberMe, resetRememberMe } = rememberMeSlice.actions;
export const rememberMeReducer = rememberMeSlice.reducer;
