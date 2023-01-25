import {createAsyncThunk} from "@reduxjs/toolkit";
import LessonService from "../../services/LessonService";
import AudioService from "../../services/AudioService";
import {IAudio} from "../../models/IAudio";

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

export const deleteLesson = createAsyncThunk(
    'lesson/deleteLesson',
    async (id: string, thunkAPI) => {
        try {
            const response = await LessonService.deleteLesson(id);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

interface CreateAudioModel {
    blob: Blob;
    lessonId: string;
}

export interface CreatedAudio {
    audio: IAudio;
    lessonId: string;
}

export const addAudio = createAsyncThunk(
    'lesson/addAudio',
    async (model: CreateAudioModel, thunkAPI) => {
        try {
            const {blob, lessonId} = model;
            const response = await AudioService.saveAudio(blob, lessonId);
            const result: CreatedAudio = {audio: response.data, lessonId: lessonId};
            return result;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)
