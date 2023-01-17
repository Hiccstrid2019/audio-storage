import {IAudio} from "./IAudio";

export interface ILesson {
    id: string;
    title: string;
    category: string;
    audios?: IAudio[];
}
