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

import { CSRF_TOKEN_KEY, ROLE_EDIT } from '../../../../src/utils/securityConstants';

export const mockTokenResponse = { token: 'ABCDEFG' };
export const mockUserName = 'userName';
export const mockPassword = 'password';
export const mockCsrfToken = 'HIJKLMONP';
export const CSRF_TOKEN_TEST = 'csrf-token-test';
export const mockUserDetails = {
    userName: mockUserName,
    firstName: 'firstName',
    lastName: 'lastName',
    roles: [ { roleId: 1, name: ROLE_EDIT } ]
};
export const mockRoles = [
    { roleId: 1, name: 'Role' }
];

export const mockLogin = (mockApi) =>
    mockApi.onPost('/oauth/authcode/login')
        .reply(200, {
            url: 'TheUrl'
        });

export const mockLogout = (mockApi) =>
    mockApi.onGet('/oauth/logout')
        .reply(200);

export const mockCheckAuthSuccess = (mockApi) =>
    mockApi.onGet('/oauth/user')
        .reply((config) =>  [
            200,
            mockUserDetails,
            {
                [CSRF_TOKEN_KEY]: mockCsrfToken,
                [CSRF_TOKEN_TEST]: config.headers[CSRF_TOKEN_KEY] === 'fetch'
            }
        ]);

export const mockCheckAuthFailure = (mockApi) =>
    mockApi.onGet('/oauth/user')
        .reply((config) => [
            401,
            'Unauthorized',
            {
                [CSRF_TOKEN_KEY]: mockCsrfToken
            }
        ])

export const mockCheckAuthFail = (mockApi) =>
    mockApi.onGet('/oauth/user')
        .reply((config) => [
            401,
            null,
            {
                [CSRF_TOKEN_KEY]: mockCsrfToken,
                [CSRF_TOKEN_TEST]: config.headers[CSRF_TOKEN_KEY] === 'fetch'
            }
        ]);

export const mockGetVideoToken = (mockApi) =>
    mockApi.onGet('/auth/videotoken/3')
        .reply(200, mockTokenResponse);