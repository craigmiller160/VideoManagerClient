import { createAction } from 'redux-starter-kit';
import VideoApiService from '../../services/VideoApiService';
import { showErrorAlert } from '../alert/alert.actions';

export const checkIsScanning = () => async (dispatch) => {
    try {
        const result = await VideoApiService.isVideoScanRunning();
        handleScanStatus(result, dispatch);
    }
    catch (ex) {
        dispatch(showErrorAlert(ex.message));
    }
};

const handleScanStatus = (result, dispatch) => {
    dispatch(setIsScanning(result.data.inProgress));
    dispatch(setScanningError(result.data.scanError));
    if (result.data.scanError) {
        dispatch(showErrorAlert('Last attempted file scanning failed with an error. Please check the server logs'));
    }
};

export const startFileScan = () => async (dispatch) => {
    try {
        dispatch(setScanningError(false));
        const result = await VideoApiService.startVideoScan();
        handleScanStatus(result, dispatch);
    }
    catch (ex) {
        dispatch(showErrorAlert(ex.message));
    }
};

export const setIsScanning = createAction('setIsScanning');
export const setScanningError = createAction('setScanningError');