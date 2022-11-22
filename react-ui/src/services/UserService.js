import api from "../http";

export default class UserService {
    static fetchUser(email, password) {
        return api.post("/user/info")
    }

}
