import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IFilterState {
    produto: boolean;
    postagem: boolean;
    disponivel: boolean;
}

export const initialState: IFilterState = {
    produto: true,
    postagem: true,
    disponivel: false,
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        toggleFilter: (state, action: PayloadAction<keyof IFilterState>) => {
            const filterKey = action.payload;
            state[filterKey] = !state[filterKey];
        },
        setFilter: (
            state,
            action: PayloadAction<{ filterKey: keyof IFilterState; value: boolean }>
        ) => {
            const { filterKey, value } = action.payload;
            state[filterKey] = value;
        },
        resetFilters: (state) => {
            state.produto = true;
            state.postagem = true;
            state.disponivel = false;
        },
    },
});

export const { toggleFilter, setFilter, resetFilters } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
