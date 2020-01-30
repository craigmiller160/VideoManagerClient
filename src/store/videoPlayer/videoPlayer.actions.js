import { createAction } from 'redux-starter-kit';
import { handleApiError } from '../alert/alert.actions';
import VideoApiService from '../../services/VideoApiService';
import * as AuthApiService from '../../services/AuthApiService';

export const loadDataForPlayback = (fileId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        const videoFileResponse = await VideoApiService.getVideoFile(fileId);
        const videoTokenResponse = await AuthApiService.getVideoToken(fileId);
        dispatch(setVideoFile(videoFileResponse.data));
        dispatch(setVideoToken(videoTokenResponse.data.token));

        await VideoApiService.recordNewVideoPlay(fileId);
    }
    catch (ex) {
        dispatch(handleApiError(ex));
    }
    finally {
        dispatch(setLoading(false));
    }
};

export const setLoading = createAction('videoPlayer/setLoading');
export const setVideoFile = createAction('videoPlayer/setVideoFile');
export const reset = createAction('videoPlayer/reset');
export const setVideoToken = createAction('videoPlayer/setVideoToken');