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

import { createReducer } from 'redux-starter-kit';
import { setCsrfToken, setIsAuth, setLoginLoading, setUserDetails } from './auth.actions';

export const initialState = {
    isAuth: false,
    loginLoading: false,
    csrfToken: null,
    userDetails: {}
};

const handleSetIsAuth = (state, action) => ({
    ...state,
    isAuth: action.payload
});

const handleSetLoginLoading = (state, action) => ({
    ...state,
    loginLoading: action.payload
});

const handleSetCsrfToken = (state, action) => ({
    ...state,
    csrfToken: action.payload
});

const handleSetUserDetails = (state, action) => {
    if (!action.payload) {
        return {
            ...state,
            userDetails: {}
        }
    }

    return {
        ...state,
        userDetails: {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            userName: action.payload.username,
            roles: action.payload.roles
                .map((role) => ({
                    name: role
                }))
        }
    }
};

export default createReducer(initialState, {
    [setIsAuth]: handleSetIsAuth,
    [setLoginLoading]: handleSetLoginLoading,
    [setCsrfToken]: handleSetCsrfToken,
    [setUserDetails]: handleSetUserDetails
});