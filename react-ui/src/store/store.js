import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";

export default class Store {
    user = {}
    isAuth = false;
    isLoading = false;
    lessons = [{
        id: 1,
        title: "Башня из слоновой кости",
        audio: [
            {id: 1, duration: 160},
            {id: 2, duration: 170},
        ]
    }, {
        id: 2,
        title: "КИШ - Отражение",
        audio: [
            {id: 1, duration: 160},
            {id: 2, duration: 170},
        ]
    }]

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    async login(email, password, navigate) {
        try {
            const responses = await AuthService.login(email, password);
            console.log(responses);
            localStorage.setItem('token', responses.data.token);
            this.setAuth(true);
            this.setUser(responses.data.user);
            navigate();
        } catch (e) {
            console.log(e.response?.data);
        }
    }

    async registration(email, username, password) {
        try {
            const responses = await AuthService.registration(email, username, password);
            localStorage.setItem('token', responses.data.token);
            this.setAuth(true);
            this.setUser(responses.data.user)
        } catch (e) {
            console.log(e.response?.data);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({})
        } catch (e) {
            console.log(e.response?.data);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`https://localhost:5001/api/auth/refresh-token`,{withCredentials: true});
            console.log(response);
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response);
        } finally {
            this.setLoading(false);
        }
    }
}
