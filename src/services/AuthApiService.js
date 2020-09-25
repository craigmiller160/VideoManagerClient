/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import API from './API';
import { CSRF_TOKEN_KEY } from '../utils/securityConstants';

export const login = () =>
    API.post('/oauth/authcode/login')
        .then((res) => {
            window.location.href = res.data.url;
        });

export const logout = () => API.get('/oauth/logout');

// TODO refactor for oauth2
export const loginOld = (userName, password) =>
    API.post('/auth/login', { userName, password });

// TODO refactor for oauth2
export const checkAuth = () =>
    API.get('/auth/check', {
        headers: {
            [CSRF_TOKEN_KEY]: 'fetch'
        }
    });

// TODO refactor for oauth2
export const logoutOld = () =>
    API.get('/auth/logout');

export const getVideoToken = (videoId) =>
    API.get(`/auth/videotoken/${videoId}`);

// TODO delete this
export const getRoles = () =>
    API.get('/auth/roles');

// TODO delete this
export const saveUserProfile = (userDetails) =>
    API.put('/auth/users/self', userDetails);

// TODO delete this
export const getAllUsers = () =>
    API.get('/auth/users');

// TODO delete this
export const getUser = (userId) =>
    API.get(`/auth/users/admin/${userId}`);

// TODO delete this
export const saveUserAdmin = (userId, userDetails) =>
    API.put(`/auth/users/admin/${userId}`, userDetails);

// TODO delete this
export const revokeAccess = (userId) =>
    API.post(`/auth/users/revoke/${userId}`);

// TODO delete this
export const createUser = (userDetails) =>
    API.post('/auth/users', userDetails);

// TODO delete this
export const deleteUser = (userId) =>
    API.delete(`/auth/users/${userId}`);