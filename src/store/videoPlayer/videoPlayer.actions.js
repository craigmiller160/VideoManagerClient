import { createAction } from 'redux-starter-kit';
import { showErrorAlert } from '../alert/alert.actions';
import VideoApiService from '../../services/VideoApiService';

export const loadDataForPlayback = (fileId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await VideoApiService.recordNewVideoPlay(fileId);
        const response = await VideoApiService.getVideoFile(fileId);
        dispatch(setVideoFile(response.data));
    }
    catch (ex) {
        dispatch(showErrorAlert(ex.message));
    }
    finally {
        dispatch(setLoading(false));
    }
};

export const setLoading = createAction('videoPlayer/setLoading');
export const setVideoFile = createAction('videoPlayer/setVideoFile');
export const reset = createAction('videoPlayer/reset');