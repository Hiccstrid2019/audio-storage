import axios from "axios";

export const API_URL = `${process.env.REACT_APP_SERVER_API}/api/`

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    console.log(error.response)
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/auth/refresh-token`,{withCredentials: true});
            localStorage.setItem('token', response.data.authData.accessToken);
            return api.request(originalRequest);
        } catch (e) {
            console.log(e)
        }
    }
    throw error;
})

export default api;
