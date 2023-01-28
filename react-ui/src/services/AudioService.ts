import api from "../http";
import {IAudio} from "../models/IAudio";

export default class AudioService {
    static serviceUrl = 'audio';
    static async saveAudio(blob: Blob, lessonId: string) {
        const data = new FormData();
        data.append('audioFile', blob);
        data.append("lessonId", lessonId)
        return api.post<IAudio>(this.serviceUrl, data, {
            headers: {'Content-Type': `multipart/form-data`}
        });
    }
    static async deleteAudio(id: string) {
        return api.delete(this.serviceUrl + `/${id}`);
    }
}
