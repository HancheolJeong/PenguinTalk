import { createSlice } from "@reduxjs/toolkit";

//초기화
const initState = {
    token: '',
    isLoggedIn : false,
    id:'',
}



const loginSlice = createSlice({
    name: 'login',
    initialState: initState,
    reducers: {
        /**
         * 로그인 상태로 변경하고 id, token값을 저장한다.
         * @param {string} state : 애플리케이션 상태
         * @param {string} action
         */
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        /**
         * 로그아웃 상태로 변경하고 id token값으로 변경한다.
         * @param {string} state 
         * @param {string} action 
         */
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = action.payload.token;
            state.id = action.payload.id;
        }
    }
});


export const {login, logout} = loginSlice.actions;

export const selectId = state => state.login.id;
export const selectToken = state => state.login.token;
export const selectIsLoggedIn = state => state.login.isLoggedIn;

export default loginSlice.reducer