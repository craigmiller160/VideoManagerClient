import { createAction } from 'redux-starter-kit';
import VideoApiService from '../../services/VideoApiService';
import { handleApiError, showErrorAlert } from '../alert/alert.actions';

export const checkIsScanning = () => async (dispatch) => {
    try {
        const result = await VideoApiService.isVideoScanRunning();
        handleScanStatus(result, dispatch);
    }
    catch (ex) {
        dispatch(handleApiError(ex));
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
        dispatch(handleApiError(ex));
    }
};

export const setIsScanning = createAction('scanning/setIsScanning');
export const setScanningError = createAction('scanning/setScanningError');