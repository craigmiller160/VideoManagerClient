import videoPlayerReducer, { initialState as videoPlayerInitState } from 'store/videoPlayer/videoPlayer.reducer';
import { setLoading, setVideoFile, reset } from 'store/videoPlayer/videoPlayer.actions';
import { NEW_VIDEO_FILE_FULL } from '../../exclude/mock/mockData/videoFileData';

describe('videoPlayer.reducer', () => {
    it('should return initial state', () => {
        expect(videoPlayerReducer(undefined, {})).toEqual(videoPlayerInitState);
    });

    it('should handle setLoading', () => {
        const action = { type: setLoading.toString(), payload: false };
        const expectedState = {
            ...videoPlayerInitState,
            loading: false
        };
        expect(videoPlayerReducer(videoPlayerInitState, action)).toEqual(expectedState);
    });

    it('should handle setVideoFile', () => {
        const action = { type: setVideoFile.toString(), payload: NEW_VIDEO_FILE_FULL };
        const expectedState = {
            ...videoPlayerInitState,
            videoFile: NEW_VIDEO_FILE_FULL
        };
        expect(videoPlayerReducer(videoPlayerInitState, action)).toEqual(expectedState);
    });

    it('should handle reset', () => {
        const action = { type: reset.toString() };
        const state = {
            loading: false,
            videoFile: NEW_VIDEO_FILE_FULL
        };
        expect(videoPlayerReducer(state, action)).toEqual(videoPlayerInitState);
    });

    it('should handle set video token', () => {
        throw new Error('Finish this');
    });
});