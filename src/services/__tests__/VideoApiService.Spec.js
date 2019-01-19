import VideoApiService from '../VideoApiService';
import API from '../API';
import MockAdapter from 'axios-mock-adapter';
import { BASE_VIDE0_FILES, FILE_COUNT, NEW_VIDEO_FILE } from '../../mock/mockData/videoFileData';
import {
    mockAddNewVideoFile, mockGetVideoFileCount, mockIsVideoScanRunning, mockPlayVideo,
    mockSearchForFiles,
    mockStartVideoScan,
    mockUpdateVideoFile
} from '../../mock/mockApiConfig/videoFileApi';

const mockApi = new MockAdapter(API);

beforeEach(() => {
    mockApi.reset();
    mockAddNewVideoFile(mockApi);
    mockUpdateVideoFile(mockApi);
    mockSearchForFiles(mockApi);
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
        try {
            const result = await VideoApiService.searchForVideos({ page: 0, sortDirection: 'ASC' });
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(BASE_VIDE0_FILES);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });

    it('Start Video Scan', async () => {
        try {
            const result = await VideoApiService.startVideoScan();
            expect(result.status).toEqual(200);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
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

    it('Get Video File Count', async () => {
        try {
            const result = await VideoApiService.getVideoFileCount();
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(FILE_COUNT);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });
});