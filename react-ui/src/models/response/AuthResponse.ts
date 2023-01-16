import {IUser} from "../IUser";

export interface AuthResponse {
    accessToken: string
    userInfo: IUser
}
