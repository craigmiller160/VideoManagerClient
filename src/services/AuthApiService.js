import API from './API';

export const login = (userName, password) =>
    API.post('/auth/login', { userName, password });

// TODO add check for header in test
export const checkAuth = () =>
    API.get('/auth/check', {
        headers: {
            'X-CSRF-TOKEN': 'fetch'
        }
    });

export const logout = () =>
    API.get('/auth/logout');