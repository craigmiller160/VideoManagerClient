import API from './API';
import { CSRF_TOKEN_KEY } from '../utils/securityConstants';

export const login = (userName, password) =>
    API.post('/auth/login', { userName, password });

// TODO add check for header in test
export const checkAuth = () =>
    API.get('/auth/check', {
        headers: {
            [CSRF_TOKEN_KEY]: 'fetch'
        }
    });

export const logout = () =>
    API.get('/auth/logout');