import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {checkAuth, login, logout, registration} from "./UserActions";
import {AuthResponse} from "../../models/response/AuthResponse";

interface UserState {
    isAuth: boolean,
    email: string,
    username: string,
    isLoading: boolean
}

const initialState: UserState = {
    isAuth: false,
    email: '',
    username: '',
    isLoading: true
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: {
        [registration.fulfilled.type]: (state: UserState, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.username = action.payload.userInfo.name;
            localStorage.setItem('token', action.payload.authData.accessToken);
        },
        [registration.pending.type]: (state: UserState) => {
            state.isLoading = true;
        },
        [registration.rejected.type]: (state: UserState, action: PayloadAction<string>) => {
            state.isLoading = false;
            console.log(action.payload);
        },


        [login.fulfilled.type]: (state: UserState, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.username = action.payload.userInfo.name;
            localStorage.setItem('token', action.payload.authData.accessToken);
        },
        [login.pending.type]: (state: UserState) => {
            state.isLoading = true;
        },
        [login.rejected.type]: (state: UserState, action: PayloadAction<string>) => {
            state.isLoading = false;
            console.log(action.payload);
        },


        [checkAuth.fulfilled.type]: (state: UserState, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.username = action.payload.userInfo.name;
            localStorage.setItem('token', action.payload.authData.accessToken);
        },
        [checkAuth.pending.type]: (state: UserState) => {
            state.isLoading = true;
        },
        [checkAuth.rejected.type]: (state: UserState, action: PayloadAction<string>) => {
            state.isLoading = false;
            console.log(action.payload);
        },


        [logout.fulfilled.type]: (state: UserState, action: PayloadAction<void>) => {
            state.isAuth = false;
            localStorage.removeItem('token');
            state.username = '';
        },
        [logout.rejected.type]: (state: UserState, action: PayloadAction<any>) => {
            console.log(action.payload);
        },
    }
})

export default userSlice.reducer;
