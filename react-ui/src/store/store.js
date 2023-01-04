import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import AudioService from "../services/AudioService";

export default class Store {
    user = {}
    isAuth = false;
    isLoading = true;
    lessons = [{
        id: 1,
        title: "Eminem - Killshot",
        category: "Rap",
        audio: [
            {id: 1, url: 'http://127.0.0.1:9000/audio/c209a2e2-37bc-4c69-b32f-5c03c2c8fddf.ogg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=QsrL590FNy6laAmb%2F20230102%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230102T204904Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=5f026e96655c0d8fbed5458a3159824ef0b219589c79a9d223538ae857e65b1c'},
            {id: 2, url: 'http://127.0.0.1:9000/audio/c209a2e2-37bc-4c69-b32f-5c03c2c8fddf.ogg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=QsrL590FNy6laAmb%2F20230102%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230102T204904Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=5f026e96655c0d8fbed5458a3159824ef0b219589c79a9d223538ae857e65b1c'},
        ]
    }, {
        id: 2,
        category: "Guitar song",
        title: "Ed Sheeran - Castle on the hill",
        audio: [
            {id: 1, url: 'http://127.0.0.1:9000/audio/c209a2e2-37bc-4c69-b32f-5c03c2c8fddf.ogg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=QsrL590FNy6laAmb%2F20230102%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230102T204904Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=5f026e96655c0d8fbed5458a3159824ef0b219589c79a9d223538ae857e65b1c'},
            {id: 2, url: 'http://127.0.0.1:9000/audio/c209a2e2-37bc-4c69-b32f-5c03c2c8fddf.ogg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=QsrL590FNy6laAmb%2F20230102%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230102T204904Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=5f026e96655c0d8fbed5458a3159824ef0b219589c79a9d223538ae857e65b1c'},
        ]
    },{
        id: 3,
        category: "Dick",
        title: "CUMbat Alina - Deep DS",
        audio: [
            {id: 1, url: 'http://127.0.0.1:9000/audio/c209a2e2-37bc-4c69-b32f-5c03c2c8fddf.ogg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=QsrL590FNy6laAmb%2F20230102%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230102T204904Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=5f026e96655c0d8fbed5458a3159824ef0b219589c79a9d223538ae857e65b1c'},
            {id: 2, url: 'http://127.0.0.1:9000/audio/c209a2e2-37bc-4c69-b32f-5c03c2c8fddf.ogg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=QsrL590FNy6laAmb%2F20230102%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230102T204904Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=5f026e96655c0d8fbed5458a3159824ef0b219589c79a9d223538ae857e65b1c'},
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
            this.setUser(responses.data.userInfo);
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

    async logout(navigate) {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
            navigate();
        } catch (e) {
            console.log(e.response?.data);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try{
            const response = await axios.get(`https://localhost:5001/api/auth/refresh-token`,{withCredentials: true});
            console.log(response);
            localStorage.setItem('token', response.data.authData.token);
            this.setAuth(true);
            this.setUser(response.data.userInfo)
        } catch (e) {
            console.log(e.response);
        } finally {
            this.setLoading(false);
        }
    }

    async sendAudio(blob) {
        try {
            const response = await AudioService.saveFile(blob);
            console.log(response);
        } catch (e) {
            console.error(e.response);
        }
    }
}
