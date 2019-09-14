import axios from 'axios';
import store from '../store/store';
import { CSRF_TOKEN_KEY } from '../utils/securityConstants';
import { setIsAuth } from '../store/auth/auth.actions';

const instance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    withCredentials: true
});

// TODO make sure unit tests are up to date
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
    store.dispatch(setIsAuth(false));
    throw error;
};

instance.interceptors.request.use(addCsrfTokenInterceptor);
instance.interceptors.response.use((response) => response, handle401Interceptor);

export default instance;