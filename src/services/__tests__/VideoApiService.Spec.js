import VideoApiService from '../VideoApiService';
import API from '../API';
import MockAdapter from 'axios-mock-adapter';
import { BASE_VIDE0_FILES, NEW_VIEW_FILE } from '../../mock/mockData/videoFileData';
import {
    mockAddNewVideoFile, mockIsVideoScanRunning, mockPlayVideo,
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
});

describe('VideoApiService', () => {
    it('Add File', async () => {
        try {
            const result = await VideoApiService.addVideoFile(NEW_VIEW_FILE);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_VIEW_FILE);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Update File', async () => {
        try {
            const result = await VideoApiService.updateVideoFile(1, NEW_VIEW_FILE);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_VIEW_FILE);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Search for Files', async () => {
        try {
            const result = await VideoApiService.searchForVideos({}, 0, 'ASC');
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(BASE_VIDE0_FILES);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Start Video Scan', async () => {
        try {
            const result = await VideoApiService.startVideoScan();
            expect(result.status).toEqual(200);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Is Video Scan Running', async () => {
        try {
            const result = await VideoApiService.isVideoScanRunning();
            expect(result.status).toEqual(200);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Play Video', async () => {
        try {
            const result = await VideoApiService.startVideoScan();
            expect(result.status).toEqual(200);
        }
        catch (ex) {
            throw ex;
        }
    });
});