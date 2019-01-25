import { createAction } from 'redux-starter-kit';
import VideoApiService from '../../services/VideoApiService';
import { showErrorAlert } from '../alert/alert.actions';

export const checkIsScanning = () => async (dispatch) => {
    try {
        const result = await VideoApiService.isVideoScanRunning();
        dispatch(setIsScanning(result.data.inProgress));
    }
    catch (ex) {
        console.log(ex);
        dispatch(showErrorAlert(ex.message));
    }
};

export const startFileScan = () => async (dispatch) => {
    try {

    }
    catch (ex) {
        console.log(ex);
        dispatch(showErrorAlert(ex.message));
    }
};

export const setIsScanning = createAction('setIsScanning');