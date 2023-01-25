import {ILesson} from "../../models/ILesson";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addAudio, addLesson, CreatedAudio, deleteLesson, fetchLessons} from "./LessonActions";

interface LessonState {
    lessons: ILesson[];
    isLoading: boolean;
}

const initialState: LessonState = {
    lessons: [],
    isLoading: false
}

export const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchLessons.fulfilled.type]: (state: LessonState, action: PayloadAction<ILesson[]>) => {
            state.isLoading = false;
            state.lessons = action.payload;
        },
        [fetchLessons.pending.type]: (state: LessonState) => {
            state.isLoading = true;
        },
        [fetchLessons.pending.type]: (state: LessonState, action: PayloadAction<string>) => {
            state.isLoading = false;
        },


        [addLesson.fulfilled.type]: (state: LessonState, action: PayloadAction<ILesson>) => {
            state.lessons.push(action.payload);
        },
        [addLesson.rejected.type]: (state: LessonState, action: PayloadAction<string>) => {
            console.log(action.payload)
        },

        [addAudio.fulfilled.type]: (state: LessonState, action: PayloadAction<CreatedAudio>) => {
            state.lessons.find(l => l.id === action.payload.lessonId)!.audios = state.lessons.find(l => l.id === action.payload.lessonId)?.audios || [];
            state.lessons.find(l => l.id === action.payload.lessonId)?.audios?.push(action.payload.audio);
        },
        [addAudio.rejected.type]: (state: LessonState, action: PayloadAction<string>) => {
            console.log(action.payload)
        },

        [deleteLesson.fulfilled.type]: (state: LessonState, action: PayloadAction<ILesson>) => {
            state.lessons = state.lessons.filter(lesson => lesson.id !== action.payload.id);
        }
    }
})

export default lessonSlice.reducer;
