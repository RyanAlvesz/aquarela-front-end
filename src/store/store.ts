import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"
import { inputReducer } from "@/store/inputSlice"
import { selectedCategoriesReducer } from "@/store/categoriesSlice"
import { searchReducer } from "@/store/searchSlice"
import { scrollReducer } from "./scrollSlice"
import { profileReducer } from "./profileSlice"
import { userReducer } from "./userSlice"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { rememberMeReducer } from "./RememberMe"

const inputPersistConfig = {
    key: "inputs",
    storage: storage,
    whitelist: [
        'name',
        'registerNickname',
        'loginNickname',
        'email',
        'cpf',
        'registerPassword',
        'loginPassword',
        'confirmPassword',
        'birthday',
        'telephone',
    ],
}

const rememberMePersistConfig = {
    key: "rememberMe",
    storage: storage,
    whitelist: ["rememberMe"],
};

const userPersistConfig = {
    key: "user",
    storage: storage,
    whitelist: [
        'id',
        'nome',
        'nome_usuario',
        'email',
        'cpf',
        'data_nascimento',
        'telefone',
        'foto_usuario',
        'descricao',
        'disponibilidade',
    ],
};

const rootReducer = combineReducers({
    input: persistReducer(inputPersistConfig, inputReducer),
    selectedCategories: selectedCategoriesReducer,
    user: persistReducer(userPersistConfig, userReducer),
    scroll: scrollReducer,
    search: searchReducer,
    profile: profileReducer,
    rememberMe: persistReducer(rememberMePersistConfig, rememberMeReducer),
});   

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;