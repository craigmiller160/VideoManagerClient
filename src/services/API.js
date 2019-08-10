import axios from 'axios';
import { TOKEN_KEY } from '../utils/securityConstants';

const instance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        };
    }
    return config;
});

export default instance;