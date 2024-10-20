import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { inputReducer } from "@/store/inputSlice";
import { userReducer } from "./userSlice";
import { selectedCategoriesReducer } from "@/store/categoriesSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { scrollReducer } from "./scrollSlice";

const inputPersistConfig = {
    key: "inputs",
    storage: storage,
    whitelist: [
        'name',
        'nickname',
        'email',
        'cpf',
        'password',
        'confirmPassword',
        'birthday',
        'telephone'
    ],
}

const userPersistConfig = {
    key: "user",
    storage: storage,
    whitelist: [
        'nome',
        'nome_usuario',
        'email',
        'senha',
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
    scroll: scrollReducer
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