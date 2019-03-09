import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import {
    expandVideoFile,
    saveVideoFile, saveVideoFileEdits,
    searchForVideos,
    setCurrentPage,
    setPagination,
    setVideoList
} from 'store/videoList/videoList.actions';
import {
    BASE_VIDE0_FILES,
    NEW_VIDEO_FILE,
    NEW_VIDEO_FILE_FULL_FILTERS,
    PAGINATION_COUNTS
} from '../../exclude/mock/mockData/videoFileData';
import {
    mockGetAllFiles,
    mockSearchForFiles, mockUpdateFullVideoFile,
    mockUpdateVideoFile
} from '../../exclude/mock/mockApiConfig/videoFileApi';
import { initialState as videoListInitState } from 'store/videoList/videoList.reducer';
import { setSearching } from 'store/videoSearch/videoSearch.actions';
import { showSuccessAlert } from 'store/alert/alert.actions';
import { FORM_NAME as VideoSearchFormName } from 'components/AppContent/VideoListLayout/VideoSearch/VideoSearch';
import { FORM_NAME as VideoEditFormName } from 'components/AppContent/VideoFileEdit/VideoFileEdit';

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
        const noConfigState = {
            videoList: videoListInitState,
            form: {
                [VideoSearchFormName]: {
                    values: {
                        category: { value: 0 },
                        series: { value: 0 },
                        star: { value: 0 },
                        search: ''
                    }
                }
            }
        };
        const configState = {
            videoList: videoListInitState,
            form: {
                [VideoSearchFormName]: {
                    values: {
                        category: { value: 1 },
                        series: { value: 1 },
                        star: { value: 1 },
                        search: 'Hello World'
                    }
                }
            }
        };

        beforeEach(() => {
            mockApi.reset();
            mockGetAllFiles(mockApi);
            mockSearchForFiles(mockApi);
            mockUpdateVideoFile(mockApi);
            mockUpdateFullVideoFile(mockApi);
        });

        describe('searchForVideos action', () => {
            it('performs the search', async () => {
                const store = mockStore(noConfigState);

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
                    expect(ex).toBeUndefined();
                }
                expect(store.getActions()).toEqual(expectedActions);
            });

            it('searchForVideos with config', async () => {
                const store = mockStore(configState);

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
                    expect(ex).toBeUndefined();
                }
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('saveVideoFile action', () => {
            it('saves the video file', async () => {
                const store = mockStore(noConfigState);

                const expectedActions = [
                    { type: showSuccessAlert.toString(), payload: 'Successfully saved video file' },
                    { type: setSearching.toString(), payload: true },
                    { type: setPagination.toString(), payload: PAGINATION_COUNTS },
                    { type: setVideoList.toString(), payload: BASE_VIDE0_FILES },
                    { type: setSearching.toString(), payload: false }
                ];

                try {
                    await store.dispatch(saveVideoFile(NEW_VIDEO_FILE));
                }
                catch (ex) {
                    expect(ex).toBeUndefined();
                }
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('saveVideoFileEdits action', () => {
            const videoEditForm = {
                values: {
                    ...NEW_VIDEO_FILE_FULL_FILTERS
                }
            };

            it('throws an error if form not available', async () => {
                const store = mockStore(noConfigState);

                try {
                    await store.dispatch(saveVideoFileEdits());
                }
                catch (ex) {
                    expect(ex).not.toBeUndefined();
                    return;
                }
                // eslint-disable-next-line no-undef
                fail('Should have thrown exception');
            });

            it('saves the video file edits', async () => {
                const store = mockStore({
                    ...noConfigState,
                    form: {
                        ...noConfigState.form,
                        [VideoEditFormName]: videoEditForm
                    }
                });

                const expectedActions = [
                    { type: showSuccessAlert.toString(), payload: 'Successfully saved video file' },
                    { type: setSearching.toString(), payload: true },
                    { type: setPagination.toString(), payload: PAGINATION_COUNTS },
                    { type: setVideoList.toString(), payload: BASE_VIDE0_FILES },
                    { type: setSearching.toString(), payload: false }
                ];

                try {
                    await store.dispatch(saveVideoFileEdits());
                }
                catch (ex) {
                    expect(ex).toBeUndefined();
                }

                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });


});