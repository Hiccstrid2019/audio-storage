import {IProject} from "../../models/IProject";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addAudio, addProject, CreatedAudio, deleteProject, fetchProjects} from "./ProjectActions";

interface ProjectState {
    projects: IProject[];
    isLoading: boolean;
}

const initialState: ProjectState = {
    projects: [],
    isLoading: false
}

export const projectSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchProjects.fulfilled.type]: (state: ProjectState, action: PayloadAction<IProject[]>) => {
            state.isLoading = false;
            state.projects = action.payload;
        },
        [fetchProjects.pending.type]: (state: ProjectState) => {
            state.isLoading = true;
        },
        [fetchProjects.pending.type]: (state: ProjectState, action: PayloadAction<string>) => {
            state.isLoading = false;
        },


        [addProject.fulfilled.type]: (state: ProjectState, action: PayloadAction<IProject>) => {
            state.projects.push(action.payload);
        },
        [addProject.rejected.type]: (state: ProjectState, action: PayloadAction<string>) => {
            console.log(action.payload)
        },

        [addAudio.fulfilled.type]: (state: ProjectState, action: PayloadAction<CreatedAudio>) => {
            state.projects.find(l => l.id === action.payload.lessonId)!.audios = state.projects.find(l => l.id === action.payload.lessonId)?.audios || [];
            state.projects.find(l => l.id === action.payload.lessonId)?.audios?.push(action.payload.audio);
        },
        [addAudio.rejected.type]: (state: ProjectState, action: PayloadAction<string>) => {
            console.log(action.payload)
        },

        [deleteProject.fulfilled.type]: (state: ProjectState, action: PayloadAction<IProject>) => {
            state.projects = state.projects.filter(lesson => lesson.id !== action.payload.id);
        }
    }
})

export default projectSlice.reducer;
