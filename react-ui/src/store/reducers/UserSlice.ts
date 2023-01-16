import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login} from "./UserActionCreators";
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
    isLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: {
        [login.fulfilled.type]: (state: UserState, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.username = action.payload.userInfo.name;
            localStorage.setItem('token', action.payload.accessToken);
        },
        [login.pending.type]: (state: UserState) => {
            state.isLoading = false;
        },
        [login.rejected.type]: (state: UserState, action: PayloadAction<string>) => {
            state.isLoading = false;
            console.log(action.payload);
        },
    }
})

export default userSlice.reducer;
