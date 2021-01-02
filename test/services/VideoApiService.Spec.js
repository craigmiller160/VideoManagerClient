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

import VideoApiService from '../../src/services/VideoApiService';
import API from '../../src/services/API';
import MockAdapter from 'axios-mock-adapter';
import {
    BASE_VIDEO_SEARCH_RESULT,
    FILE_SCAN_STATUS,
    NEW_VIDEO_FILE,
    NEW_VIDEO_FILE_FULL
} from '../exclude/mock/mockData/videoFileData';
import {
    mockAddNewVideoFile,
    mockGetAllFiles, mockGetVideoFile,
    mockGetVideoFileCount,
    mockIsVideoScanRunning, mockRecordNewVideoPlay,
    mockStartVideoScan,
    mockUpdateVideoFile
} from '../exclude/mock/mockApiConfig/videoFileApi';
import { mockCsrfPreflight } from '@craigmiller160/ajax-api/lib/test-utils';

const mockApi = new MockAdapter(API.instance);

describe('VideoApiService', () => {
    beforeEach(() => {
        mockApi.reset();
        mockAddNewVideoFile(mockApi);
        mockUpdateVideoFile(mockApi);
        mockGetAllFiles(mockApi);
        mockStartVideoScan(mockApi);
        mockIsVideoScanRunning(mockApi);
        mockGetVideoFileCount(mockApi);
        mockGetVideoFile(mockApi);
        mockRecordNewVideoPlay(mockApi);
        // mockSearchForFiles(mockApi);
    });

    it('Add File', async () => {
        mockCsrfPreflight(mockApi, '/video-files');
        try {
            const result = await VideoApiService.addVideoFile(NEW_VIDEO_FILE);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_VIDEO_FILE);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });

    it('Update File', async () => {
        mockCsrfPreflight(mockApi, '/video-files/3');
        try {
            const result = await VideoApiService.updateVideoFile(3, NEW_VIDEO_FILE);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_VIDEO_FILE);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });

    it('Search for Files', async () => {
        mockCsrfPreflight(mockApi, '/video-files/search');
        let result;
        try {
            result = await VideoApiService.searchForVideos({
                page: 0,
                searchText: '',
                categoryId: 0,
                starId: 0,
                seriesId: 0,
                sortBy: 'NAME',
                sortDir: 'ASC'
            });
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
        expect(result).toBeTruthy();
        expect(result.status).toEqual(200);
        expect(result.data).toEqual(BASE_VIDEO_SEARCH_RESULT);
    });

    it('Start Video Scan', async () => {
        mockCsrfPreflight(mockApi, '/video-files/scanner');
        let result;
        try {
            result = await VideoApiService.startVideoScan();
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
        expect(result).toBeTruthy();
        expect(result.status).toEqual(200);
        expect(result.data).toEqual(FILE_SCAN_STATUS);
    });

    it('Is Video Scan Running', async () => {
        try {
            const result = await VideoApiService.isVideoScanRunning();
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(FILE_SCAN_STATUS);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });

    it('Get Video File', async () => {
        try {
            const result = await VideoApiService.getVideoFile(3);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_VIDEO_FILE_FULL);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });

    it('Record New Video Play', async () => {
        try {
            await VideoApiService.recordNewVideoPlay(3);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });
});
