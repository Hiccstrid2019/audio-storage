import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import AudioService from "../services/AudioService";
import LessonService from "../services/LessonService";

export default class Store {
    user = {}
    isAuth = false;
    isLoading = true;
    lessons = [{
        id: 1,
        title: "Eminem - Killshot",
        category: "Rap",
        audio: []
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

    setLessons(newLesson) {
        this.lessons = [...this.lessons, newLesson];
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
            await AuthService.logout();
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

    async sendAudio(blob, id) {
        try {
            const response = await AudioService.saveFile(blob);
            console.log(response);
            this.lessons.find(lesson => lesson.id === id).audio.push({id: response.data.uploadAudioUrl, url: response.data.url});
        } catch (e) {
            console.error(e.response);
        }
    }

    async addLesson(title, category) {
        // try {
            // const response = await LessonService.addLesson(title, category);
            let tempId = Math.floor(Math.random() * 100);
            // const newLesson = {title, category, id: response.data.lessonId, audio: []};
            const newLesson = {title, category, id: tempId, audio: []};
            this.setLessons(newLesson);
        // } catch (e) {
        //     console.error(e.response);
        // }
    }
}
