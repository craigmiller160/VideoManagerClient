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

export const handleApiError =
	(ex, description = '') =>
	(dispatch) => {
		const space = description ? ' ' : '';
		if (ex.response?.data) {
			const message = ex.response.data?.message || ex.response.data;
			const status = ex.response.status;
			dispatch(
				showErrorAlert(
					`Error. ${description}${space}Status: ${status} Message: ${message}`
				)
			);
		} else {
			dispatch(
				showErrorAlert(
					`Error: ${description}${space}Message: ${ex.message}`
				)
			);
		}
	};

export const showErrorAlert = createAction('alert/showErrorAlert');
export const showSuccessAlert = createAction('alert/showSuccessAlert');
export const hideAlert = createAction('alert/hideAlert');
