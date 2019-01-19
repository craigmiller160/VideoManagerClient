import { createAction } from 'redux-starter-kit';
import VideoApiService from '../../services/VideoApiService';

export const searchForVideos = () => async (dispatch, getState) => {
    try {
        const {
            videoList: { currentPage },
            form
        } = getState();

        const searchConfig = { page: currentPage };
        if (form && form.videoSearch) {
            const { category, series, star, search } = form.videoSearch;
            searchConfig.categoryId = category;
            searchConfig.seriesId = series;
            searchConfig.starId = star;
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
        // TODO need error handling in the UI
        console.log('Error', ex);
    }
};

export const setVideoList = createAction('setVideoList');
export const setPagination = createAction('setPagination');
export const setCurrentPage = createAction('setCurrentPage');
export const expandVideoFile = createAction('expandVideoFile');