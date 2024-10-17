import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISelectedCategoriesState {
    ids: number[];
}

const initialState: ISelectedCategoriesState = {
    ids: [],
};

export const selectedCategoriesSlice = createSlice({
    name: "selectedCategories",
    initialState,
    reducers: {
        toggleCategory: (state, action: PayloadAction<number>) => {
            const categoryId = action.payload;
            if (state.ids.includes(categoryId)) {
                state.ids = state.ids.filter(id => id !== categoryId);
            } else {
                state.ids.push(categoryId);
            }
        },
        resetCategories: (state) => {
            state.ids = [];
        },
    },
});

export const { toggleCategory, resetCategories } = selectedCategoriesSlice.actions;
export const selectedCategoriesReducer = selectedCategoriesSlice.reducer;