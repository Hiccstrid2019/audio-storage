import {IAudio} from "./IAudio";

export interface IProject {
    id: string;
    title: string;
    category: string;
    audios?: IAudio[];
}
