import { BaseUser, DetailedUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
    user: BaseUser & DetailedUser | null
}

const initialProfileState: ProfileState = {
    user: null,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState: initialProfileState,
    reducers: {
        setProfile: (state, action: PayloadAction<BaseUser & DetailedUser>) => {
            state.user = action.payload; 
        },
        resetProfile: (state) => {
            state.user = null; 
        },
    },
});

export const { setProfile, resetProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
