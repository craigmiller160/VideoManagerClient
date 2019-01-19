import { createReducer } from 'redux-starter-kit';
import { setVideoList, setPagination, setCurrentPage, expandVideoFile } from './videoList.actions';

export const initialState = {
    videoList: [],
    pagination: {
        totalItems: 0,
        itemsPerPage: 0
    },
    currentPage: 0
};

const handleSetVideoList = (state, action) => ({
    ...state,
    videoList: action.payload.map((videoFile) => ({
        ...videoFile,
        expanded: false
    }))
});

const handleSetPagination = (state, action) => ({
    ...state,
    pagination: action.payload
});

const handleSetCurrentPage = (state, action) => ({
    ...state,
    currentPage: action.payload
});

const handleExpandVideoFile = (state, action) => ({
    ...state,
    videoList: state.videoList.map((videoFile) => {
        if (action.payload === videoFile.fileId) {
            return {
                ...videoFile,
                expanded: true
            }
        }
        return {
            ...videoFile,
            expanded: false
        }
    })
});

export default createReducer(initialState, {
    [setVideoList]: handleSetVideoList,
    [setPagination]: handleSetPagination,
    [setCurrentPage]: handleSetCurrentPage,
    [expandVideoFile]: handleExpandVideoFile
});

