import { createSlice } from "@reduxjs/toolkit";

const initState = {
    token: '',
    isLoggedIn : false,
    id:'',
}



const loginSlice = createSlice({
    name: 'login',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = action.payload;
            state.id = action.payload.id;
        }
    }
});


export const {login, logout} = loginSlice.actions;

export const selectId = state => state.login.id;
export const selectToken = state => state.login.token;
export const selectIsLoggedIn = state => state.login.isLoggedIn;

export default loginSlice.reducer