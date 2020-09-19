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

export const deleteUser = (userId) =>
    API.delete(`/auth/users/${userId}`);