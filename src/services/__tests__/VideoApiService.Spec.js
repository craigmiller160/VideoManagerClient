import VideoApiService from '../VideoApiService';
import API from '../API';
import MockAdapter from 'axios-mock-adapter';
import { BASE_VIDEO_SEARCH_RESULT, NEW_VIDEO_FILE } from '../../mock/mockData/videoFileData';
import {
    mockAddNewVideoFile,
    mockGetAllFiles,
    mockGetVideoFileCount,
    mockIsVideoScanRunning,
    mockPlayVideo,
    mockStartVideoScan,
    mockUpdateVideoFile
} from '../../mock/mockApiConfig/videoFileApi';

const mockApi = new MockAdapter(API);

beforeEach(() => {
    mockApi.reset();
    mockAddNewVideoFile(mockApi);
    mockUpdateVideoFile(mockApi);
    mockGetAllFiles(mockApi);
    mockStartVideoScan(mockApi);
    mockIsVideoScanRunning(mockApi);
    mockPlayVideo(mockApi);
    mockGetVideoFileCount(mockApi);
});

describe('VideoApiService', () => {
    it('Add File', async () => {
        try {
            const result = await VideoApiService.addVideoFile(NEW_VIDEO_FILE);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_VIDEO_FILE);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });

    it('Update File', async () => {
        try {
            const result = await VideoApiService.updateVideoFile(1, NEW_VIDEO_FILE);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_VIDEO_FILE);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });

    it('Search for Files', async () => {
        let result;
        try {
            result = await VideoApiService.searchForVideos({
                page: 0,
                sortDirection: 'ASC',
                searchText: '',
                categoryId: 0,
                starId: 0,
                seriesId: 0
            });
        }
        catch (ex) {
            console.log(ex);
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
            console.log(ex);
            expect(ex).toBeUndefined();
        }
        expect(result).toBeTruthy();
        expect(result.status).toEqual(200);
    });

    it('Is Video Scan Running', async () => {
        try {
            const result = await VideoApiService.isVideoScanRunning();
            expect(result.status).toEqual(200);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });

    it('Play Video', async () => {
        try {
            const result = await VideoApiService.playVideo(NEW_VIDEO_FILE);
            expect(result.status).toEqual(200);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });
});