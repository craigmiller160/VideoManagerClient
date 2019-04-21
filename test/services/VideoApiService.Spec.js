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

const mockApi = new MockAdapter(API);

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