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

import { createAction } from 'redux-starter-kit';
import * as AuthService from 'services/AuthApiService';
import { CSRF_TOKEN_KEY } from '../../utils/securityConstants';
import { handleApiError, showErrorAlert, showSuccessAlert } from '../alert/alert.actions';
import { unFormatRoles } from '../../components/AppContent/User/UserDetails/userUtils';

export const setIsAuth = createAction('auth/setIsAuth');
export const setLoginLoading = createAction('auth/setLoginLoading');
export const setCsrfToken = createAction('auth/setCsrfToken');
export const setUserDetails = createAction('auth/setUserDetails');

export const handleCsrfToken = (response) => (dispatch) => {
    const csrfToken = response?.headers?.[CSRF_TOKEN_KEY];
    dispatch(setCsrfToken(csrfToken));
};

export const checkAuth = () => async (dispatch) => {
    try {
        const response = await AuthService.getAuthUser();
        dispatch(handleCsrfToken(response));
        dispatch(setIsAuth(true));
        dispatch(setUserDetails(response.data));
    }
    catch (ex) {
        dispatch(handleCsrfToken(ex.response));
        dispatch(setIsAuth(false));
        dispatch(setUserDetails(null));
    }
};

export const login = ({ userName, password }) => async (dispatch) => {
    dispatch(setLoginLoading(true));
    try {
        await AuthService.login(userName, password);
        await dispatch(checkAuth());
    }
    catch (ex) {
        dispatch(setIsAuth(false));
        if (ex?.response?.status === 401) {
            dispatch(showErrorAlert('Invalid login'));
        }
        else {
            dispatch(handleApiError(ex));
        }
    }
    finally {
        dispatch(setLoginLoading(false));
    }
};

export const logout = () => async (dispatch) => {
    await AuthService.logout();
    dispatch(setIsAuth(false));
    dispatch(setUserDetails(null));
};

export const saveUserProfile = (values) => async (dispatch) => {
    const payload = {
        ...values,
        roles: unFormatRoles(values.roles)
    };
    delete payload.lastAuthenticated;

    try {
        await AuthService.saveUserProfile(payload);
        await dispatch(checkAuth());
        dispatch(showSuccessAlert('Successfully saved user profile'));
    } catch (ex) {
        dispatch(handleApiError(ex));
    }
};
