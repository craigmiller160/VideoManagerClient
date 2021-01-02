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

import {
    loadDataForPlayback,
    setLoading,
    setVideoFile,
    reset,
    setVideoToken
} from 'store/videoPlayer/videoPlayer.actions';
import { NEW_VIDEO_FILE_FULL } from '../../exclude/mock/mockData/videoFileData';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import { mockGetVideoFile, mockRecordNewVideoPlay } from '../../exclude/mock/mockApiConfig/videoFileApi';
import { mockGetVideoToken, mockTokenResponse } from '../../exclude/mock/mockApiConfig/authApi';

const mockStore = configureMockStore([thunk]);
const mockApi = new MockAdapter(API.instance);

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

    it('creates reset action', () => {
        const expectedAction = {
            type: reset.toString()
        };
        const action = reset();
        expect(action).toEqual(expectedAction);
    });

    it('creates setVideoToken action', () => {
        const videoId = 10;
        const expectedAction = {
            type: setVideoFile.toString(),
            payload: videoId
        };
        const action = setVideoFile(videoId);
        expect(action).toEqual(expectedAction);
    });

    describe('thunk actions', () => {
        beforeEach(() => {
            mockApi.reset();
            mockGetVideoFile(mockApi);
            mockRecordNewVideoPlay(mockApi);
            mockGetVideoToken(mockApi);
        });

        it('loads data for playback', async () => {
            const store = mockStore({});

            const expectedActions = [
                { type: setLoading.toString(), payload: true },
                { type: setVideoFile.toString(), payload: NEW_VIDEO_FILE_FULL },
                { type: setVideoToken.toString(), payload: mockTokenResponse.token },
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
