import {ILesson} from "../../models/ILesson";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addLesson, fetchLessons} from "./LessonActions";

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
    }
})

export default lessonSlice.reducer;
