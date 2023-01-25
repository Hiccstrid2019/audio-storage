import api from "../http";
import {ILesson} from "../models/ILesson";
import {AxiosResponse} from "axios";

export default class LessonService {
    static serviceUrl = "lesson";
    static async getLessons(): Promise<AxiosResponse<ILesson[]>> {
        return api.get<ILesson[]>(this.serviceUrl + "/lessons");
    }
    static async addLesson(title: string, category: string): Promise<AxiosResponse<ILesson>> {
        return api.post<ILesson>(this.serviceUrl + "/lesson", {title, category});
    }

    static async deleteLesson(id: string) : Promise<AxiosResponse<ILesson>> {
        return api.delete(this.serviceUrl + `/lesson/${id}`);
    }
}
