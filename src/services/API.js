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

import axios, { Cancel } from 'axios';
import { CSRF_TOKEN_KEY } from '../utils/securityConstants';

const instance = axios.create({
    baseURL: '/video-manager/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    withCredentials: true
});

const CSRF_METHODS = ['post', 'put', 'delete'];

export const addCsrfTokenInterceptor = async (config) => {
    if (CSRF_METHODS.includes(config.method)) {
        try {
            const optionsRes = await instance.options(config.url, {
                headers: {
                    [CSRF_TOKEN_KEY]: 'fetch'
                }
            });
            const token = optionsRes.headers[CSRF_TOKEN_KEY]
            config.headers = {
                ...config.headers,
                [CSRF_TOKEN_KEY]: token
            };
        } catch (ex) {
            throw new Cancel('Request failed preflight');
        }
    }
    return config;
};

instance.interceptors.request.use(addCsrfTokenInterceptor, (error) => Promise.reject(error));

export default instance;
