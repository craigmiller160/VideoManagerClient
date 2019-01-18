import { createAction } from 'redux-starter-kit';
import VideoApiService from '../../services/VideoApiService';

export const searchForVideos = () => async (dispatch, getState) => {
    try {
        const {
            videoList: {
                currentPage
            },
            form: {
                videoSearch: {
                    category,
                    series,
                    star,
                    search
                }
            }
        } = getState();

        const result = await VideoApiService.searchForVideos({
            page: currentPage,
            categoryId: category,
            seriesId: series,
            starId: star,
            searchText: search
        });

        // TODO need to store the result in redux
    }
    catch (ex) {
        // TODO need error handling in the UI
        console.log('Error', ex);
    }
};

export const setVideoList = createAction('setVideoList');
export const setPagination = createAction('setPagination');
export const setCurrentPage = createAction('setCurrentPage');