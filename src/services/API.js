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
    if (noAuthStatuses.includes(error?.response?.status) &&
        error?.config?.url !== refreshUri &&
        !error?.config?.rerun) {
        try {
            await instance.get('/auth/refresh'); // TODO do not need refresh anymore
        } catch (ex) {
            error.suppressed = ex;
            store.dispatch(setIsAuth(false));
            throw error;
        }

        try {
            return await instance.request({
                ...error.config,
                url: error.config.url.replace('/api', ''),
                rerun: true
            });
        } catch (ex2) {
            ex2.suppressed = error;
            throw ex2;
        }
    }
    throw error;
};

instance.interceptors.request.use(addCsrfTokenInterceptor);
instance.interceptors.response.use((response) => response, handle401Interceptor);

export default instance;
