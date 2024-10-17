import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IScrollState {
    position: number;
}

const initialScrollState: IScrollState = {
    position: 0,
};

export const scrollSlice = createSlice({
    name: "scroll",
    initialState: initialScrollState,
    reducers: {
        setScrollPosition: (state, action: PayloadAction<number>) => {
            state.position = action.payload;
        },
        resetScrollPosition: (state) => {
            state.position = 0; 
        },
    },
});

export const { setScrollPosition, resetScrollPosition } = scrollSlice.actions;
export const scrollReducer = scrollSlice.reducer;
