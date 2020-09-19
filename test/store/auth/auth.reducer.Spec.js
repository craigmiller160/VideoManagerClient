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

import authReducer, { initialState as authInitState } from 'store/auth/auth.reducer';
import { setCsrfToken, setIsAuth, setLoginLoading, setUserDetails } from '../../../src/store/auth/auth.actions';
import { mockCsrfToken, mockUserDetails } from '../../exclude/mock/mockApiConfig/authApi';

describe('auth.reducer', () => {
    it('returns initial state', () => {
        expect(authReducer(undefined, {})).toEqual(authInitState);
    });

    it('handleSetIsAuth', () => {
        const action = { type: setIsAuth.toString(), payload: true };
        const expectedState = {
            ...authInitState,
            isAuth: true
        };
        expect(authReducer(authInitState, action)).toEqual(expectedState);
    });

    it('handleSetLoginLoading', () => {
        const action = { type: setLoginLoading.toString(), payload: true };
        const expectedState = {
            ...authInitState,
            loginLoading: true
        };
        expect(authReducer(authInitState, action)).toEqual(expectedState);
    });

    it('handleSetCsrfToken', () => {
        const action = { type: setCsrfToken.toString(), payload: mockCsrfToken };
        const expectedState = {
            ...authInitState,
            csrfToken: mockCsrfToken
        };
        expect(authReducer(authInitState, action)).toEqual(expectedState);
    });

    it('handleSetUserDetails', () => {
        const action = { type: setUserDetails.toString(), payload: mockUserDetails };
        const expectedState = {
            ...authInitState,
            userDetails: mockUserDetails
        };
        expect(authReducer(authInitState, action)).toEqual(expectedState);
    });

    it('handleSetUserDetails null value', () => {
        const action = { type: setUserDetails.toString(), payload: null };
        const expectedState = {
            ...authInitState,
            userDetails: {}
        };
        expect(authReducer(authInitState, action)).toEqual(expectedState);
    });
});