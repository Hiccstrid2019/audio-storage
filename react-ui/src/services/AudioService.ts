import api from "../http";
import {IAudio} from "../models/IAudio";

export default class AudioService {
    static async saveAudio(blob: Blob, lessonId: string) {
        const data = new FormData();
        data.append('audioFile', blob);
        data.append("lessonId", lessonId)
        return api.post<IAudio>('audio', data, {
            headers: {'Content-Type': `multipart/form-data`}
        });
    }
}
