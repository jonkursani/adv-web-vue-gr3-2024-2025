import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8080/api/v1/',
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    console.log('Request error:', error);
    return Promise.reject(error);
});

export default axiosInstance;