import axios from 'axios';
import { TOKEN_KEY } from '../utils/securityConstants';

const instance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const addTokenInterceptor = (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        };
    }
    return config;
};

instance.interceptors.request.use(addTokenInterceptor);

export default instance;