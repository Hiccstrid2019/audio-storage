import api from "../http";
import {AxiosResponse} from "axios";
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static serviceUrl = 'auth/';
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>(this.serviceUrl + "login", {email, password})
    }

    static async registration(email: string, username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>(this.serviceUrl + "register", {email, username, password})
    }

    static async logout(): Promise<void> {
        return api.get(this.serviceUrl + "logout")
    }
}
