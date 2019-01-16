import { createReducer } from 'redux-starter-kit';
import { setVideoList, setPagination, setCurrentPage } from './videoList.actions';

const initialState = {
    videoList: [],
    pagination: {
        totalItems: 0,
        itemsPerPage: 0
    },
    currentPage: 1
};

const handleSetVideoList = (state, action) => ({
    ...state,
    videoList: action.payload
});

const handleSetPagination = (state, action) => ({
    ...state,
    pagination: action.payload
});

const handleSetCurrentPage = (state, action) => ({
    ...state,
    currentPage: action.payload
});

export default createReducer(initialState, {
    [setVideoList]: handleSetVideoList,
    [setPagination]: handleSetPagination,
    [setCurrentPage]: handleSetCurrentPage
});

