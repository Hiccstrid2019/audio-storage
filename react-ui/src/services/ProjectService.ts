import api from "../http";
import {IProject} from "../models/IProject";
import {AxiosResponse} from "axios";
import {PosterResponse} from "../models/response/PosterResponse";

export default class ProjectService {
    static serviceUrl = "projects";
    static async getProjects(): Promise<AxiosResponse<IProject[]>> {
        return api.get<IProject[]>(this.serviceUrl);
    }

    static async getProjectById(id: string): Promise<AxiosResponse<IProject>> {
        return api.get<IProject>(this.serviceUrl + `/${id}`);
    }
    static async addProject(title: string, category: string): Promise<AxiosResponse<IProject>> {
        return api.post<IProject>(this.serviceUrl, {title, category});
    }

    static async deleteProject(id: string) : Promise<AxiosResponse<IProject>> {
        return api.delete(this.serviceUrl + `/${id}`);
    }

    static async updateProject(id: string, title: string, category: string): Promise<AxiosResponse<IProject>> {
        return api.put<IProject>(this.serviceUrl + `/${id}`, {projectId: id, title, category});
    }

    static async uploadPoster(id: string, file: File): Promise<AxiosResponse<PosterResponse>> {
        const data = new FormData();
        data.append("projectId", id);
        data.append("imgFile", file);
        return api.post<PosterResponse>(this.serviceUrl + '/poster', data, {
            headers: {'Content-Type': `multipart/form-data`}
        })
    }
}
