import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
    user: User | null
}

const initialProfileState: ProfileState = {
    user: null,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState: initialProfileState,
    reducers: {
        setProfile: (state, action: PayloadAction<User>) => {
            state.user = action.payload; 
        },
        resetProfile: (state) => {
            state.user = null; 
        },
    },
});

export const { setProfile, resetProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
