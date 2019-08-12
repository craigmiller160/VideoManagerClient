import API from './API';

export const login = (userName, password) =>
    API.post('/auth/login', { userName, password });

export const checkAuth = () =>
    API.get('/auth/check');