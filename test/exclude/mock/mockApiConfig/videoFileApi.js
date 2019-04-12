import {
    BASE_VIDEO_SEARCH_RESULT,
    EMPTY_SEARCH,
    FILE_COUNT, FILE_SCAN_STATUS,
    FULL_SEARCH,
    NEW_VIDEO_FILE, NEW_VIDEO_FILE_FULL
} from '../mockData/videoFileData';

export const  mockAddNewVideoFile = (mockApi) => {
    mockApi.onPost('/video-files', NEW_VIDEO_FILE)
        .reply(200, NEW_VIDEO_FILE);
};

export const mockUpdateVideoFile = (mockApi) => {
    mockApi.onPut('/video-files/3', NEW_VIDEO_FILE)
        .reply(200, NEW_VIDEO_FILE);
};

export const mockUpdateFullVideoFile = (mockApi) => {
    mockApi.onPut('/video-files/3', NEW_VIDEO_FILE_FULL)
        .reply(200, NEW_VIDEO_FILE_FULL);
};

export const mockSearchForFiles = (mockApi) => {
    mockApi.onPost('/video-files/search', FULL_SEARCH)
        .reply(config => {
            expect(config.params).toEqual({
                page: 0,
                sortDirection: 'ASC'
            });
            return [200, BASE_VIDEO_SEARCH_RESULT];
        });
};

export const mockGetAllFiles = (mockApi) => {
    mockApi.onPost('/video-files/search', EMPTY_SEARCH)
        .reply(config => {
            expect(config.params).toEqual({
                page: 0,
                sortDirection: 'ASC'
            });
            return [200, BASE_VIDEO_SEARCH_RESULT];
        });
};

export const mockStartVideoScan = (mockApi) => {
    mockApi.onPost('/video-files/scanner')
        .reply(200, FILE_SCAN_STATUS);
};

export const mockIsVideoScanRunning = (mockApi) => {
    mockApi.onGet('/video-files/scanner')
        .reply(200, FILE_SCAN_STATUS);
};

export const mockGetVideoFile = (mockApi) => {
    mockApi.onGet('/video-files/3')
        .reply(200, NEW_VIDEO_FILE_FULL)
};

export const mockGetVideoFileCount = (mockApi) => {
    mockApi.onGet('/video-files/count')
        .reply(200, FILE_COUNT);
};