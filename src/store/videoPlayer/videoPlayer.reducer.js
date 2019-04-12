import { createReducer } from 'redux-starter-kit';
import { setLoading, setVideoFile } from './videoPlayer.actions';

export const initialState = {
    loading: true,
    videoFile: null
};

const handleSetLoading = (state, action) => ({
    ...state,
    loading: action.payload
});

const handleSetVideFile = (state, action) => ({
    ...state,
    videoFile: action.payload
});

export default createReducer(initialState, {
    [setLoading]: handleSetLoading,
    [setVideoFile]: handleSetVideFile()
});