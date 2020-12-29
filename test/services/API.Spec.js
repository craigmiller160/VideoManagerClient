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

import API, { addCsrfTokenInterceptor } from '../../src/services/API';
import { CSRF_TOKEN_KEY } from 'utils/securityConstants';
import MockAdapter from 'axios-mock-adapter';

const mockApi = new MockAdapter(API);

describe('API', () => {
    beforeEach(() => {
        mockApi.reset();
    });

    describe('addCsrfTokenInterceptor', () => {
        it('does nothing for GET', async () => {
            mockApi.onGet('/foo/bar')
                .reply(200, 'Success');

            const res = await API.get('/foo/bar');
        });

        it('adds CSRF token for POST', () => {
            throw new Error();
        });

        it('adds CSRF token for PUT', () => {
            throw new Error();
        });

        it('adds CSRF token for DELETE', () => {
            throw new Error();
        });

        it('has error while getting CSRF token', async () => {
            mockApi.onPost('/foo/bar')
                .reply(200, 'Success');
            try {
                await API.post('/foo/bar');
            } catch (ex) {
                expect(ex.message).toEqual('Request failed preflight');
                return;
            }
            throw new Error('Request should have been cancelled');
        });
    });
});
