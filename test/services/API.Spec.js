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

import API, { addCsrfTokenInterceptor, handle401Interceptor } from '../../src/services/API';
import { CSRF_TOKEN_KEY } from 'utils/securityConstants';
import MockAdapter from 'axios-mock-adapter';
import { mockCsrfToken } from '../exclude/mock/mockApiConfig/authApi';

jest.mock('store/store', () => {
    let csrfToken = '';
    let actions = [];

    return {
        getState() {
            return {
                auth: {
                    csrfToken
                }
            }
        },
        setCsrfToken(token) {
            csrfToken = token
        },
        clearCsrfToken() {
            csrfToken = '';
        },
        dispatch(action) {
            actions.push(action);
        },
        getActions() {
            return actions;
        },
        clearActions() {
            actions = [];
        }
    }
});

import store from 'store/store'; // eslint-disable-line import/first

const apiGetSpy = jest.spyOn(API, 'get');
const apiRequestSpy = jest.spyOn(API, 'request');

const contentType = 'Content-Type';
const applicationJson = 'application/json';

const mockApi = new MockAdapter(API);

describe('API', () => {
    beforeEach(() => {
        store.clearCsrfToken();
        store.clearActions();
        mockApi.reset();
        apiRequestSpy.mockClear();
        apiGetSpy.mockClear();
    });

    describe('addCsrfTokenInterceptor', () => {
        const config = {
            method: 'post',
            headers: {
                [contentType]: applicationJson
            }
        };

        it('adds token if exists', () => {
            store.setCsrfToken(mockCsrfToken);
            const result = addCsrfTokenInterceptor(config);
            expect(result).toEqual({
                ...config,
                headers: {
                    ...config.headers,
                    [CSRF_TOKEN_KEY]: mockCsrfToken
                }
            });
        });

        it('does not add token if not exists', () => {
            const result = addCsrfTokenInterceptor(config);
            expect(result).toEqual(config);
        });

        it('does not add token if method is get', () => {
            store.setCsrfToken(mockCsrfToken);
            const result = addCsrfTokenInterceptor({ ...config, method: 'get' });
            expect(result).toEqual({
                ...config,
                method: 'get',
                headers: {
                    ...config.headers
                }
            });
        });
    });
});
