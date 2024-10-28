import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
    query: string;
}

const initialSearchState: SearchState = {
    query: '',
};

export const searchSlice = createSlice({
    name: "search",
    initialState: initialSearchState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        resetQuery: (state) => {
            state.query = '';
        },
    },
});

export const { setQuery, resetQuery } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
