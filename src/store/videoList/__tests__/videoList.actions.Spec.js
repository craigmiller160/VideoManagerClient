import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import API from '../../../services/API';
import { searchForVideos, setCurrentPage, setPagination, setVideoList } from '../videoList.actions';
import { BASE_VIDE0_FILES, PAGINATION_COUNTS } from '../../../mock/mockData/videoFileData';
import { mockGetVideoFileCount, mockSearchForFiles } from '../../../mock/mockApiConfig/videoFileApi';
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
            mockSearchForFiles(mockApi);

            store = mockStore({
                videoList: videoListInitState,
                form: {
                    videoSearch: {
                        category: 0,
                        series: 0,
                        star: 0,
                        search: ''
                    }
                }
            });
        });

        describe('searchForVideos action', () => {
            it('performs the search', async () => {
                const expectedActions = [
                    { type: setPagination.toString(), payload: PAGINATION_COUNTS },
                    { type: setVideoList.toString(), payload: BASE_VIDE0_FILES }
                ];

                try {
                    await store.dispatch(searchForVideos());
                }
                catch (ex) {
                    console.log('Error', ex);
                    expect(ex).toBeUndefined();
                }
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });


});