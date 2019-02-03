import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import API from '../../../src/services/API';
import { expandVideoFile, searchForVideos, setCurrentPage, setPagination, setVideoList } from '../../../src/store/videoList/videoList.actions';
import { BASE_VIDE0_FILES, PAGINATION_COUNTS } from '../../mock/mockData/videoFileData';
import { mockGetAllFiles, mockGetVideoFileCount, mockSearchForFiles } from '../../mock/mockApiConfig/videoFileApi';
import { initialState as videoListInitState } from '../../../src/store/videoList/videoList.reducer';
import { setSearching } from '../../../src/store/videoSearch/videoSearch.actions';

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

    describe('expandVideoFile action', () => {
        const expectedAction = {
            type: expandVideoFile.toString(),
            payload: 1
        };
        const action = expandVideoFile(1);
        expect(action).toEqual(expectedAction);
    });

    describe('asynchronous thunk actions', () => {
        beforeEach(() => {
            mockApi.reset();
            mockGetAllFiles(mockApi);
            mockSearchForFiles(mockApi);
        });

        describe('searchForVideos action', () => {
            it('performs the search', async () => {
                const store = mockStore({
                    videoList: videoListInitState,
                    form: {
                        'video-search': {
                            values: {
                                category: { value: 0 },
                                series: { value: 0 },
                                star: { value: 0 },
                                search: ''
                            }
                        }
                    }
                });

                const expectedActions = [
                    { type: setSearching.toString(), payload: true },
                    { type: setPagination.toString(), payload: PAGINATION_COUNTS },
                    { type: setVideoList.toString(), payload: BASE_VIDE0_FILES },
                    { type: setSearching.toString(), payload: false }
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

            it('searchForVideos with config', async () => {
                const store = mockStore({
                    videoList: videoListInitState,
                    form: {
                        'video-search': {
                            values: {
                                category: { value: 1 },
                                series: { value: 1 },
                                star: { value: 1 },
                                search: 'Hello World'
                            }
                        }
                    }
                });

                const expectedActions = [
                    { type: setSearching.toString(), payload: true },
                    { type: setPagination.toString(), payload: PAGINATION_COUNTS },
                    { type: setVideoList.toString(), payload: BASE_VIDE0_FILES },
                    { type: setSearching.toString(), payload: false }
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