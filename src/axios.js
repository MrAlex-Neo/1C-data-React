import axios from "axios";

const instance = axios.create({
    baseURL: 'http://193.176.79.10:4444/'
})

instance.interceptors.request.use((config) => {
    if (window.localStorage.getItem('token') !== null) {
        config.headers.Authorization = "Bearer " + window.localStorage.getItem('token')
    }
    return config
})

export default instance;

