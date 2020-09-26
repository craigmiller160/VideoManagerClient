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

import {
    checkAuth,
    handleCsrfToken,
    setCsrfToken,
    setIsAuth,
    setLoginLoading,
    setUserDetails
} from 'store/auth/auth.actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import {
    mockCheckAuthFail,
    mockCheckAuthSuccess,
    mockCsrfToken,
    mockLoginFail,
    mockLoginSuccess,
    mockLogout,
    mockPassword, mockSaveUserProfile,
    mockUserDetails,
    mockUserName
} from '../../exclude/mock/mockApiConfig/authApi';
import { showErrorAlert, showSuccessAlert } from 'store/alert/alert.actions';
import { CSRF_TOKEN_KEY, ROLE_EDIT } from '../../../src/utils/securityConstants';

const mockStore = configureMockStore([thunk]);
const mockApi = new MockAdapter(API);

describe('auth.actions', () => {
    beforeEach(() => {
        mockApi.reset();
    });

    it('setIsAuth', () => {
        const expectedAction = {
            type: setIsAuth.toString(),
            payload: true
        };
        const action = setIsAuth(true);
        expect(action).toEqual(expectedAction);
    });

    it('setLoginLoading', () => {
        const expectedAction = {
            type: setLoginLoading.toString(),
            payload: true
        };
        const action = setLoginLoading(true);
        expect(action).toEqual(expectedAction);
    });

    it('setCsrfToken', () => {
        const csrfToken = 'csrfToken';
        const expectedAction = {
            type: setCsrfToken.toString(),
            payload: csrfToken
        };
        const action = setCsrfToken(csrfToken);
        expect(action).toEqual(expectedAction);
    });

    it('setUserDetails', () => {
        const expectedAction = {
            type: setUserDetails.toString(),
            payload: mockUserDetails
        };
        const action = setUserDetails(mockUserDetails);
        expect(action).toEqual(expectedAction);
    });

    describe('thunk actions', () => {
        let store;
        beforeEach(() => {
            store = mockStore({});
        });

        describe('handleCsrfToken', () => {
            it('sets token', () => {
                const expectedActions = [
                    { type: setCsrfToken.toString(), payload: mockCsrfToken }
                ];
                const response = {
                    headers: {
                        [CSRF_TOKEN_KEY]: mockCsrfToken
                    }
                };
                store.dispatch(handleCsrfToken(response));
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('checkAuth', () => {
            it('checkAuth is authenticated', async () => {
                mockCheckAuthSuccess(mockApi);
                const expectedActions = [
                    { type: setIsAuth.toString(), payload: true },
                    { type: setUserDetails.toString(), payload: mockUserDetails }
                ];
                await store.dispatch(checkAuth());
                expect(store.getActions()).toEqual(expectedActions);
            });

            it('checkAuth is not authenticated', async () => {
                mockCheckAuthFail(mockApi);
                const expectedActions = [
                    { type: setIsAuth.toString(), payload: false },
                    { type: setUserDetails.toString(), payload: null }
                ];
                await store.dispatch(checkAuth());
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
});
