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