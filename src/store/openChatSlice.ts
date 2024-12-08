import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IChatState {
    openChatId: string | null
}

const initialChatState: IChatState = {
    openChatId: null,
}

export const chatSlice = createSlice({
    name: "chat",
    initialState: initialChatState,
    reducers: {
        setOpenChatId: (state, action: PayloadAction<string>) => {
            state.openChatId = action.payload
        },
        resetOpenChatId: (state) => {
            state.openChatId = null
        },
    },
})

export const { setOpenChatId, resetOpenChatId } = chatSlice.actions
export const chatReducer = chatSlice.reducer