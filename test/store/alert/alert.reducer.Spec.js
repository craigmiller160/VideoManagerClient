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

import alertReducer, {
	initialState as alertInitialState
} from 'store/alert/alert.reducer';
import {
	hideAlert,
	showErrorAlert,
	showSuccessAlert
} from 'store/alert/alert.actions';

describe('alert.reducer', () => {
	const MESSAGE = 'Hello World';

	it('should return initial state', () => {
		expect(alertReducer(undefined, {})).toEqual(alertInitialState);
	});

	it('should handle showErrorAlert', () => {
		const action = { type: showErrorAlert.toString(), payload: MESSAGE };
		const expectedState = {
			color: 'danger',
			message: MESSAGE,
			show: true
		};
		expect(alertReducer(undefined, action)).toEqual(expectedState);
	});

	it('should handle showSuccessAlert', () => {
		const action = { type: showSuccessAlert.toString(), payload: MESSAGE };
		const expectedState = {
			color: 'success',
			message: MESSAGE,
			show: true
		};
		expect(alertReducer(undefined, action)).toEqual(expectedState);
	});

	it('should handle hideAlert', () => {
		const action = { type: hideAlert.toString() };
		const expectedState = {
			...alertInitialState,
			show: false
		};
		expect(alertReducer(undefined, action)).toEqual(expectedState);
	});
});
