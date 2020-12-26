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
import store from '../store/store';
import { setCsrfToken } from '../store/auth/auth.actions';

export const login = () =>
    API.post('/oauth/authcode/login')
        .then((res) => {
            window.location.assign(res.data.url);
            return res;
        });

export const logout = () => API.get('/oauth/logout');

const handleCsrfToken = (response) => {
    const csrfToken = response.headers[CSRF_TOKEN_KEY];
    store.dispatch(setCsrfToken(csrfToken));
};

// TODO update tests
export const getAuthUser = () => API.get('/oauth/user', {
    headers: {
        [CSRF_TOKEN_KEY]: 'fetch'
    }
})
    .then((res) => {
        handleCsrfToken(res);
        return res;
    })
    .catch((ex) => {
        if (ex.response) {
            handleCsrfToken(ex.response);
        }
        throw ex;
    });

export const getVideoToken = (videoId) =>
    API.get(`/auth/videotoken/${videoId}`);