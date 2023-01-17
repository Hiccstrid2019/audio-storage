import {createAsyncThunk} from "@reduxjs/toolkit";
import LessonService from "../../services/LessonService";

export const fetchLessons = createAsyncThunk(
    'lesson/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await LessonService.getLessons();
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

interface CreateLessonModel {
    title: string;
    category: string;
}

export const addLesson = createAsyncThunk(
    'lesson/addLesson',
    async (model: CreateLessonModel, thunkAPI) => {
        try {
            const {title, category} = model;
            const response = await LessonService.addLesson(title, category);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)
