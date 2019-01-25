import { createAction } from 'redux-starter-kit';
import VideoApiService from '../../services/VideoApiService';
import { showErrorAlert } from '../alert/alert.actions';

export const checkIsScanning = () => async (dispatch) => {
    try {
        const result = await VideoApiService.isVideoScanRunning();
        dispatch(setIsScanning(result.data.inProgress));
        dispatch(setScanningError(result.data.scanError));
    }
    catch (ex) {
        console.log(ex);
        dispatch(showErrorAlert(ex.message));
    }
};

export const startFileScan = () => async (dispatch) => {
    try {
        dispatch(setScanningError(false));
        const result = await VideoApiService.startVideoScan();
        dispatch(setIsScanning(result.data.inProgress));
        dispatch(setScanningError(result.data.scanError));
    }
    catch (ex) {
        console.log(ex);
        dispatch(showErrorAlert(ex.message));
    }
};

export const setIsScanning = createAction('setIsScanning');
export const setScanningError = createAction('setScanningError');