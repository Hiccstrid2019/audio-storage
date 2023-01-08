import api from "../http";

export default class LessonService {
    static async addLesson(title, category) {
        return api.post("lesson", {title, category});
    }
}