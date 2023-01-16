import {AppDispatch} from "../store";
import {lessonSlice} from "./LessonSlice";
import LessonService from "../../services/LessonService";
import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";

export const fethcUsers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(lessonSlice.actions.lessonsFetching());
        const response = await LessonService.getLessons();
        dispatch(lessonSlice.actions.lessonsFetchingSuccess(response.data))
    } catch (e) {
        dispatch(lessonSlice.actions.lessonsFetchingError())
    }
}

export interface LoginModel {
    email: string,
    password: string
}

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
