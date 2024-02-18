import { createSlice } from "@reduxjs/toolkit";

const initState = {
    token: '',
    isLoggedIn : false,
}



const loginSlice = createSlice({
    name: 'login',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = action.payload;
        }
    }
});


export const {login, logout} = loginSlice.actions

export default loginSlice.reducer