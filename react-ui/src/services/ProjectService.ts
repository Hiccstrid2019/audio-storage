import api from "../http";
import {IProject} from "../models/IProject";
import {AxiosResponse} from "axios";

export default class ProjectService {
    static serviceUrl = "projects";
    static async getProjects(): Promise<AxiosResponse<IProject[]>> {
        return api.get<IProject[]>(this.serviceUrl);
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
}
