import api from "../http";

export default class AuthService {
    static async login(email, password) {
        return api.post("/api/auth/login", {email, password})
    }

    static async registration(email, username, password) {
        return api.post("/api/auth/register", {email, username, password})
    }

    static async logout(email, username, password) {
        return api.post("api/auth/logout")
    }
}
