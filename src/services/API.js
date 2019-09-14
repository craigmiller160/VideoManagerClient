import axios from 'axios';
import store from '../store/store';
import { CSRF_TOKEN_KEY } from '../utils/securityConstants';

const instance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    withCredentials: true
});

export const addCsrfTokenInterceptor = (config) => {
    const { csrfToken } = store.getState().auth;
    if (csrfToken && config.method !== 'get') {
        config.headers = {
            ...config.headers,
            [CSRF_TOKEN_KEY]: csrfToken
        };
    }
    return config;
};

export const handle401Interceptor = async (error) => { // TODO create unit tests
    if (error.response.status === 401 && error.config.url !== '/api/auth/refresh') {
        try {
            await instance.get('/auth/refresh');
            return instance.request({
                ...error.config,
                url: error.config.url.replace('/api', '')
            });
        } catch (ex) {
            error.suppresed = ex;
        }
    }
    // TODO probably need to dispatch redux action if 401 error to bump back to login page
    throw error;
};

instance.interceptors.request.use(addCsrfTokenInterceptor);
instance.interceptors.response.use((response) => response, handle401Interceptor);

export default instance;