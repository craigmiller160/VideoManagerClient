import { createReducer } from 'redux-starter-kit';
import { setLoading, setVideoFile, reset, setVideoToken } from './videoPlayer.actions';

export const initialState = {
    loading: true,
    videoFile: {},
    videoToken: ''
};

const handleSetLoading = (state, action) => ({
    ...state,
    loading: action.payload
});

const handleSetVideoFile = (state, action) => ({
    ...state,
    videoFile: action.payload
});

const handleReset = () => ({
    ...initialState
});

const handleSetVideoToken = (state, action) => ({
    ...state,
    videoToken: action.payload
});

export default createReducer(initialState, {
    [setLoading]: handleSetLoading,
    [setVideoFile]: handleSetVideoFile,
    [reset]: handleReset,
    [setVideoToken]: handleSetVideoToken
});