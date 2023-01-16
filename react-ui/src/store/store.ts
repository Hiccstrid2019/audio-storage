import {combineReducers, configureStore} from "@reduxjs/toolkit";
import lessonReducer from './reducers/LessonSlice'
import userReducer from './reducers/UserSlice'

const rootReducer = combineReducers({
    lessonReducer,
    userReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
