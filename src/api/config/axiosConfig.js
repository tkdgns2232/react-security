import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
    
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("AccessToken");
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

export const setAccessToken = (token) => {
    if(!!token) {
        localStorage.setItem("AccessToken", token);
    } else {
        localStorage.removeItem("AccessToken");
    }
};

export const setRefreshToken = (token) => {
    if(!!token) {
        localStorage.setItem("RefreshToken", token);
    } else {
        localStorage.removeItem("RefreshToken");
    }
};