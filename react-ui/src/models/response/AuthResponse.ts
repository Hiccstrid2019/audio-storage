import {IUser} from "../IUser";

interface AuthData {
    accessToken: string
}

export interface AuthResponse {
    authData: AuthData
    userInfo: IUser
}
