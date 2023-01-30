import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import axios from "axios";

interface LoginModel {
    email: string,
    password: string
}

interface RegisterModel {
    email: string;
    username: string;
    password: string;
}

export const registration = createAsyncThunk(
    'user/regiser',
    async (model: RegisterModel, thunkAPI) => {
        try {
            const {email, username, password} = model;
            const response = await AuthService.registration(email, username, password);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)


export const login = createAsyncThunk(
    'user/login',
    async (model:LoginModel, thunkAPI) => {
        try {
            const {email, password} = model;
            const response = await AuthService.login(email, password);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/auth/refresh-token`,{withCredentials: true});
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        try {
            const response = await AuthService.logout();
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)
