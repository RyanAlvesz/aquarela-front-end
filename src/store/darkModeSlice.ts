import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IDarkModeState {
    darkMode: boolean
}

const darkModeInitialState: IDarkModeState = {
    darkMode: false,
};

export const darkModeSlice = createSlice({
    name: "darkMode",
    initialState: darkModeInitialState,
    reducers: {
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
        },
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        },
        resetDarkMode: (state) => {
            state.darkMode = false
        },
    },
});

export const { setDarkMode: setDarkMode, resetDarkMode: resetDarkMode } = darkModeSlice.actions;
export const darkModeReducer = darkModeSlice.reducer;
