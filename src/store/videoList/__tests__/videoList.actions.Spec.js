import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import API from '../../../services/API';
import { getVideoFileCount, setCurrentPage, setPagination, setVideoList } from '../videoList.actions';
import { BASE_VIDE0_FILES, PAGINATION_COUNTS } from '../../../mock/mockData/videoFileData';
import { mockGetVideoFileCount } from '../../../mock/mockApiConfig/videoFileApi';
import { initialState as videoListInitState } from '../videoList.reducer';

const mockStore = configureMockStore([thunk]);
const mockApi = new MockAdapter(API);

describe('videoList.actions', () => {
    describe('setVideoList action', () => {
        it('creates the action', () => {
            const expectedAction = {
                type: setVideoList.toString(),
                payload: BASE_VIDE0_FILES
            };
            const action = setVideoList(BASE_VIDE0_FILES);
            expect(action).toEqual(expectedAction);
        });
    });

    describe('setPagination action', () => {
        const expectedAction = {
            type: setPagination.toString(),
            payload: PAGINATION_COUNTS
        };
        const action = setPagination(PAGINATION_COUNTS);
        expect(action).toEqual(expectedAction);
    });

    describe('setCurrentPage action', () => {
        const expectedAction = {
            type: setCurrentPage.toString(),
            payload: 5
        };
        const action = setCurrentPage(5);
        expect(action).toEqual(expectedAction);
    });

    describe('asynchronous thunk actions', () => {
        let store;

        beforeEach(() => {
            mockApi.reset();
            mockGetVideoFileCount(mockApi);

            store = mockStore(videoListInitState);
        });

        describe('searchForVideos action', () => {
            it('performs the search', () => {
                throw new Error('Complete the function and then complete this test');
            });
        });

        describe('getVideoFileCount action', () => {
            it('loads the data', async () => {
                const expectedActions = [
                    { type: setPagination.toString(), payload: PAGINATION_COUNTS }
                ];

                try {
                    await store.dispatch(getVideoFileCount());
                    expect(store.getActions()).toEqual(expectedActions);
                }
                catch (ex) {
                    console.log('Error', ex);
                    expect(ex).toBeNull();
                }
            });
        });
    });


});