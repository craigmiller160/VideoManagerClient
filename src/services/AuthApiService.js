import API from './API';
import { CSRF_TOKEN_KEY } from '../utils/securityConstants';

export const login = (userName, password) =>
    API.post('/auth/login', { userName, password });

export const checkAuth = () =>
    API.get('/auth/check', {
        headers: {
            [CSRF_TOKEN_KEY]: 'fetch'
        }
    });

export const logout = () =>
    API.get('/auth/logout');

export const getVideoToken = (videoId) =>
    API.get(`/auth/videotoken/${videoId}`);

export const getRoles = () =>
    API.get('/auth/roles');

export const saveUserProfile = (userDetails) =>
    API.put('/auth/users/self', userDetails);

export const getAllUsers = () =>
    API.get('/auth/users');

export const getUser = (userId) =>
    API.get(`/auth/users/admin/${userId}`);

export const saveUserAdmin = (userId, userDetails) =>
    API.put(`/auth/users/admin/${userId}`, userDetails);

export const revokeAccess = (userId) =>
    API.post(`/auth/users/revoke/${userId}`);

export const createUser = (userDetails) =>
    API.post('/auth/users', userDetails);