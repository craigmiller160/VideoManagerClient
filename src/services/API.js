import axios from 'axios';
import store from '../store/store';
import { CSRF_TOKEN_KEY } from '../utils/securityConstants';

const instance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export const addTokenInterceptor = (config) => {
    const { csrfToken } = store.getState().auth;
    if (csrfToken && config.method !== 'get') {
        config.headers = {
            ...config.headers,
            [CSRF_TOKEN_KEY]: csrfToken
        };
    }
    return config;
};

export const handle401Interceptor = (config) => {
    // TODO finish this
};

instance.interceptors.request.use(addTokenInterceptor);

export default instance;