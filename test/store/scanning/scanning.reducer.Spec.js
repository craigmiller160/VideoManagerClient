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

import scanningReducer, {
	initialState as scanningInitialState
} from '../../../src/store/scanning/scanning.reducer';
import {
	setIsScanning,
	setScanningError
} from '../../../src/store/scanning/scanning.actions';

describe('scanning.reducer', () => {
	it('should return initial state', () => {
		expect(scanningReducer(undefined, {})).toEqual(scanningInitialState);
	});

	it('should handle setIsScanning', () => {
		const action = { type: setIsScanning.toString(), payload: true };
		const expectedState = { ...scanningInitialState, isScanning: true };
		expect(scanningReducer(undefined, action)).toEqual(expectedState);
	});

	it('should handle setScanningError', () => {
		const action = { type: setScanningError.toString(), payload: true };
		const expectedState = { ...scanningInitialState, scanningError: true };
		expect(scanningReducer(undefined, action)).toEqual(expectedState);
	});
});
