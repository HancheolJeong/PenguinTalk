import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import loginSlice from "./slices/loginSlice";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";

// Updated reducer setup
const reducer = combineReducers({
    login: loginSlice // Directly use the slice without .reducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['login']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer
});

export default store;