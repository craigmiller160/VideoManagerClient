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
import VideoApiService from '../../services/VideoApiService';
import { handleApiError, showErrorAlert } from '../alert/alert.actions';

export const checkIsScanning = () => async (dispatch) => {
	try {
		const result = await VideoApiService.isVideoScanRunning();
		handleScanStatus(result, dispatch);
	} catch (ex) {
		dispatch(handleApiError(ex));
	}
};

const handleScanStatus = (result, dispatch) => {
	dispatch(setIsScanning(result.data.inProgress));
	dispatch(setScanningError(result.data.scanError));
	if (result.data.scanError) {
		dispatch(
			showErrorAlert(
				'Last attempted file scanning failed with an error. Please check the server logs'
			)
		);
	}
};

export const startFileScan = () => async (dispatch) => {
	try {
		dispatch(setScanningError(false));
		const result = await VideoApiService.startVideoScan();
		handleScanStatus(result, dispatch);
	} catch (ex) {
		dispatch(handleApiError(ex));
	}
};

export const setIsScanning = createAction('scanning/setIsScanning');
export const setScanningError = createAction('scanning/setScanningError');
