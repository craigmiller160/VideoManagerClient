import { createReducer } from 'redux-starter-kit';
import { setLoading, setVideoFile, reset } from './videoPlayer.actions';

export const initialState = {
    loading: true,
    videoFile: {}
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

export default createReducer(initialState, {
    [setLoading]: handleSetLoading,
    [setVideoFile]: handleSetVideoFile,
    [reset]: handleReset
});