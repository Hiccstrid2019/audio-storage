import {createAsyncThunk} from "@reduxjs/toolkit";
import ProjectService from "../../services/ProjectService";
import AudioService from "../../services/AudioService";
import {IAudio} from "../../models/IAudio";

export const fetchProjects = createAsyncThunk(
    'project/fetchProjects',
    async (_, thunkAPI) => {
        try {
            const response = await ProjectService.getProjects();
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

interface CreateProjectModel {
    title: string;
    category: string;
}

export const addProject = createAsyncThunk(
    'project/addProject',
    async (model: CreateProjectModel, thunkAPI) => {
        try {
            const {title, category} = model;
            const response = await ProjectService.addProject(title, category);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const deleteProject = createAsyncThunk(
    'project/deleteProject',
    async (id: string, thunkAPI) => {
        try {
            const response = await ProjectService.deleteProject(id);
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
