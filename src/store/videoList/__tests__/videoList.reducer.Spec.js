import videoListReducer, { initialState as videoListInitState } from '../videoList.reducer';
import { setCurrentPage, setPagination, setVideoList } from '../videoList.actions';
import { BASE_VIDE0_FILES, PAGINATION_COUNTS } from '../../../mock/mockData/videoFileData';

const cloneState = () => ({
    ...videoListInitState,
    pagination: {
        ...videoListInitState.pagination
    }
});

describe('videoSearch.reducer', () => {
    it('should return initial state', () => {
        expect(videoListReducer(undefined, {})).toEqual(videoListInitState);
    });

    it('should handle setVideoList', () => {
        const action = { type: setVideoList.toString(), payload: BASE_VIDE0_FILES };
        const expectedState = cloneState();
        expectedState.videoList = BASE_VIDE0_FILES;
        expect(videoListReducer(undefined, action)).toEqual(expectedState);
    });

    it('should handle setPagination', () => {
        const action = { type: setPagination.toString(), payload: PAGINATION_COUNTS };
        const expectedState = cloneState();
        expectedState.pagination = PAGINATION_COUNTS;
        expect(videoListReducer(undefined, action)).toEqual(expectedState);
    });

    it('should handle setCurrentPage', () => {
        const action = { type: setCurrentPage.toString(), payload: 5 };
        const expectedState = cloneState();
        expectedState.currentPage = 5;
        expect(videoListReducer(undefined, action)).toEqual(expectedState);
    });
});