import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { inputReducer } from "@/store/inputSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

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

const rootReducer = combineReducers({
    input: persistReducer(inputPersistConfig, inputReducer),
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