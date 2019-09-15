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
    withCredentials: true,
    xsrfHeaderName: 'X-CSRF-TOKEN'
});

const noAuthStatuses = [401, 403];
const refreshUri = '/api/auth/refresh';

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

export const handle401Interceptor = async (error) => {
    if (noAuthStatuses.includes(error?.response?.status) && error?.config?.url !== refreshUri) {
        try {
            await instance.get('/auth/refresh');
        } catch (ex) {
            error.suppresed = ex;
            store.dispatch(setIsAuth(false));
            throw error;
        }

        try {
            return await instance.request({
                ...error.config,
                url: error.config.url.replace('/api', '')
            });
        } catch (ex2) {
            // TODO need to avoid infinite loop here... probably should have a prop on config
            ex2.suppressed = error;
            throw ex2;
        }
    }
    throw error;
};

instance.interceptors.request.use(addCsrfTokenInterceptor);
instance.interceptors.response.use((response) => response, handle401Interceptor);

export default instance;
