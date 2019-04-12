import { createAction } from 'redux-starter-kit';
import VideoApiService from '../../services/VideoApiService';
import { showErrorAlert, showSuccessAlert } from '../alert/alert.actions';
import { setSearching } from '../videoSearch/videoSearch.actions';
import { FORM_NAME } from 'components/AppContent/VideoFileEdit/VideoFileEdit';
import { convertFiltersToFile } from '../../utils/videoFileConverter';

export const searchForVideos = () => async (dispatch, getState) => {
    try {
        dispatch(setSearching(true));
        const {
            videoList: { currentPage },
            form
        } = getState();

        const searchConfig = { page: currentPage };
        if (form && form['video-search'] && form['video-search'].values) {
            const { category, series, star, search } = form['video-search'].values;
            searchConfig.categoryId = category ? category.value : 0;
            searchConfig.seriesId = series ? series.value : 0;
            searchConfig.starId = star ? star.value : 0;
            searchConfig.searchText = search;
        }

        const result = await VideoApiService.searchForVideos(searchConfig);

        dispatch(setPagination({
            itemsPerPage: result.data.filesPerPage,
            totalItems: result.data.totalFiles
        }));

        dispatch(setVideoList(result.data.videoList));
    }
    catch (ex) {
        dispatch(showErrorAlert(ex.message));
    }
    finally {
        dispatch(setSearching(false));
    }
};

export const saveVideoFileEdits = () => async (dispatch, getState) => {
    const state = getState();
    if (!state.form || !state.form[FORM_NAME]) {
        throw new Error('Video edit form is not available');
    }
    const videoFile = convertFiltersToFile({
        ...state.form[FORM_NAME].values,
        expanded: undefined
    });

    await dispatch(saveVideoFile(videoFile));
};

export const saveVideoFile = (videoFile) => async (dispatch) => {
    try {
        await VideoApiService.updateVideoFile(videoFile.fileId, videoFile);
        dispatch(showSuccessAlert('Successfully saved video file'));
        await dispatch(searchForVideos());
    }
    catch (ex) {
        dispatch(showErrorAlert(ex.message));
    }
};

export const setVideoList = createAction('setVideoList');
export const setPagination = createAction('setPagination');
export const setCurrentPage = createAction('setCurrentPage');
export const expandVideoFile = createAction('expandVideoFile');