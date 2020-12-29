/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import {
    expandVideoFile, parseSortBy, parseSortDir,
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
import {
    SORT_ASC, SORT_BY_FILE_ADDED,
    SORT_BY_LAST_VIEWED,
    SORT_BY_NAME,
    SORT_BY_VIEWS, SORT_DESC
} from 'components/AppContent/VideoListLayout/VideoSearch/VideoSearch.options';
import { mockCsrfOptions } from '../../exclude/mock/mockApiConfig/authApi';

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
                        search: '',
                        sortBy: { value: SORT_BY_NAME },
                        sortDir: { value: SORT_ASC }
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
                        search: 'Hello World',
                        sortBy: { value: SORT_BY_NAME },
                        sortDir: { value: SORT_ASC }
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
                mockCsrfOptions(mockApi, '/video-files/search');
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
                mockCsrfOptions(mockApi, '/video-files/search');
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
                mockCsrfOptions(mockApi, '/video-files/3');
                mockCsrfOptions(mockApi, '/video-files/search');
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
                throw new Error('Should have thrown exception');
            });

            it('saves the video file edits', async () => {
                mockCsrfOptions(mockApi, '/video-files/3');
                mockCsrfOptions(mockApi, '/video-files/search');
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

    describe('parseSortBy', () => {
        it('is sorting by name', () => {
            const result = parseSortBy(SORT_BY_NAME);
            expect(result).toEqual('NAME');
        });

        it('is sorting by views', () => {
            const result = parseSortBy(SORT_BY_VIEWS);
            expect(result).toEqual('VIEW_COUNT');
        });

        it('is sorting by last viewed', () => {
            const result = parseSortBy(SORT_BY_LAST_VIEWED);
            expect(result).toEqual('LAST_VIEWED');
        });

        it('is sorting by file added', () => {
            const result = parseSortBy(SORT_BY_FILE_ADDED);
            expect(result).toEqual('FILE_ADDED');
        });

        it('invalid sort by', () => {
            try {
                parseSortBy('abc');
            }
            catch (ex) {
                return;
            }
            throw new Error('Should have thrown exception');
        });
    });

    describe('parseSortDir', () => {
        it('sorts ascending', () => {
            const result = parseSortDir(SORT_ASC);
            expect(result).toEqual('ASC');
        });

        it('sorts descending', () => {
            const result = parseSortDir(SORT_DESC);
            expect(result).toEqual('DESC');
        });

        it('invalid sort direction', () => {
            try {
                parseSortDir('abc');
            }
            catch (ex) {
                return;
            }
            throw new Error('Should have thrown exception');
        });
    });
});