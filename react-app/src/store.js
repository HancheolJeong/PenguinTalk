import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";
import loginSlice from "./slices/loginSlice";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";

// Updated reducer setup
const reducer = combineReducers({
    login: loginSlice // Directly use the slice without .reducer
});


/**
 * Redux Persist라이브러리를 사용하여 Local,Session Storage에 저장하기 위한 설정을하는 함수
 * 
 */
const persistConfig = {
    key: 'root',
    storage, // 저장할 장소
    whitelist: ['login'] //화이트리스트에 있는 login만 새로고침해도 지속적으로 저장
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer
});

export default store;