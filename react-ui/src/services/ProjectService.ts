import api from "../http";
import {IProject} from "../models/IProject";
import {AxiosResponse} from "axios";

export default class ProjectService {
    static serviceUrl = "project";
    static async getProjects(): Promise<AxiosResponse<IProject[]>> {
        return api.get<IProject[]>(this.serviceUrl + "/projects");
    }
    static async addProject(title: string, category: string): Promise<AxiosResponse<IProject>> {
        return api.post<IProject>(this.serviceUrl + "/project", {title, category});
    }

    static async deleteProject(id: string) : Promise<AxiosResponse<IProject>> {
        return api.delete(this.serviceUrl + `/project/${id}`);
    }
}
