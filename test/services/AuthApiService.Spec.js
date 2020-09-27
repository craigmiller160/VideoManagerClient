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

import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import { getAuthUser, getVideoToken, login } from 'services/AuthApiService';
import {
    mockCheckAuthSuccess,
    mockCsrfToken,
    mockGetVideoToken,
    mockLogin,
    mockLogout,
    mockTokenResponse
} from '../exclude/mock/mockApiConfig/authApi';
import { CSRF_TOKEN_KEY } from '../../src/utils/securityConstants';
import { logout } from '../../src/services/AuthApiService';

const mockApi = new MockAdapter(API);

describe('AuthApiService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockApi.reset();
        mockCheckAuthSuccess(mockApi);
        mockGetVideoToken(mockApi);
        mockLogin(mockApi);
        mockLogout(mockApi);

        window.location.assign = jest.fn();
    });

    it('getAuthUser', async () => {
        const res = await getAuthUser();
        expect(res).toEqual(expect.objectContaining({
            status: 200,
            headers: expect.objectContaining({
                [CSRF_TOKEN_KEY]: mockCsrfToken
            })
        }));
    });

    it('login', async () => {
        const res = await login();
        expect(res.status).toEqual(200);
        expect(window.location.assign).toHaveBeenCalledWith('TheUrl');
    });

    it('logout', async () => {
        const res = await logout();
        expect(res.status).toEqual(200);
    });

    it('getVideoToken', async () => {
        const res = await getVideoToken(3);
        expect(res).toEqual(expect.objectContaining({
            status: 200,
            data: mockTokenResponse
        }));
    });
});
