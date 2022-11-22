import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";

export default class Store {
    user = {}
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async login(email, password) {
        try {
            const responses = await AuthService.login(email, password);
            console.log(responses);
            localStorage.setItem('token', responses.data.token);
            this.setAuth(true);
            this.setUser(responses.data.user)
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
            const responses = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({})
        } catch (e) {
            console.log(e.response?.data);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get
        } catch (e) {

        }
    }
}
