import {IProject} from "../../models/IProject";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    addAudio,
    addProject,
    CreatedAudio,
    deleteAudio,
    deleteProject,
    fetchProjects,
    updateProject
} from "./ProjectActions";

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
            const project = state.projects.find(l => l.id === action.payload.lessonId);
            project!.audios = project?.audios || [];
            project?.audios?.push(action.payload.audio);
        },
        [addAudio.rejected.type]: (state: ProjectState, action: PayloadAction<string>) => {
            console.log(action.payload)
        },

        [deleteProject.fulfilled.type]: (state: ProjectState, action: PayloadAction<IProject>) => {
            state.projects = state.projects.filter(lesson => lesson.id !== action.payload.id);
        },

        [updateProject.fulfilled.type]: (state: ProjectState, action: PayloadAction<IProject>) => {
            const project = state.projects.find(p => p.id === action.payload.id);
            project!.title = action.payload.title;
            project!.category = action.payload.category;
            project!.timeModified = action.payload.timeModified;
        },

        [deleteAudio.fulfilled.type]: (state: ProjectState, action: PayloadAction<DeletedAudio>) => {
            const project = state.projects.find(project => project.id === action.payload.projectId);
            project!.audios = project!.audios?.filter(a => a.id !== action.payload.audioId);
        }
    }
})

interface DeletedAudio {
    audioId: string;
    projectId: string;
}
export default projectSlice.reducer;
