import { loadDataForPlayback, setLoading, setVideoFile } from 'store/videoPlayer/videoPlayer.actions';
import { NEW_VIDEO_FILE_FULL } from '../../exclude/mock/mockData/videoFileData';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import API from '../../../src/services/API';
import { mockGetVideoFile } from '../../exclude/mock/mockApiConfig/videoFileApi';

const mockStore = configureMockStore([thunk]);
const mockApi = new MockAdapter(API);

describe('videoPlayer.actions', () => {
    it('creates setLoading action', () => {
        const expectedAction = {
            type: setLoading.toString(),
            payload: true
        };
        const action = setLoading(true);
        expect(action).toEqual(expectedAction);
    });

    it('creates setVideoFile action', () => {
        const expectedAction = {
            type: setVideoFile.toString(),
            payload: NEW_VIDEO_FILE_FULL
        };
        const action = setVideoFile(NEW_VIDEO_FILE_FULL);
        expect(action).toEqual(expectedAction);
    });

    describe('thunk actions', () => {
        beforeEach(() => {
            mockGetVideoFile(mockApi);
        });

        it('loads data for playback', async () => {
            const store = mockStore({});

            const expectedActions = [
                { type: setLoading.toString(), payload: true },
                { type: setVideoFile.toString(), payload: NEW_VIDEO_FILE_FULL },
                { type: setLoading.toString(), payload: false }
            ];

            try {
                await store.dispatch(loadDataForPlayback(3));
            }
            catch (ex) {
                expect(ex).toBeUndefined();
            }

            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});