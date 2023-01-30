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
import * as AuthService from '../../services/AuthApiService';
import { CSRF_TOKEN_KEY } from '../../utils/securityConstants';

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
		dispatch(setIsAuth(true));
		dispatch(setUserDetails(response.data));
	} catch (ex) {
		dispatch(setIsAuth(false));
		dispatch(setUserDetails(null));
	}
};

export const clearAuth = () => (dispatch) => {
	dispatch(setIsAuth(false));
	dispatch(setUserDetails(null));
};
