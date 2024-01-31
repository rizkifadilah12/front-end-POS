import axios from "axios";

const axiosDriver = axios.create();

axiosDriver.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

export default axiosDriver;