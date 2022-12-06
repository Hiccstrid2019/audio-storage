import api from "../http";

export default class AudioService {
    static async saveFile(blob) {
        const data = new FormData();
        data.append('file', blob);
        return api.post('api/audio', data, {
            headers: {'Content-Type': `multipart/form-data`}
        });
    }
}
