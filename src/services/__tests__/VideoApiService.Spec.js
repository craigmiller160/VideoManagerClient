import VideoApiService from '../VideoApiService';
import API from '../API';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(API);

const files = [
    { id: 1, fileName: 'FirstFile' },
    { id: 2, fileName: 'SecondFile' }
];

const newFile = { id: 3, fileName: 'ThirdFile' };

beforeEach(() => {
    mock.reset();
    mock.onPost('/video-files', newFile)
        .reply(200, newFile);
    mock.onPut('/video-files/1', newFile)
        .reply(200, newFile);
    mock.onPost('/video-files/search', {})
        .reply(config => {
            expect(config.params).toEqual({
                page: 0,
                sortDirection: 'ASC'
            });
            return [200, files];
        });
    mock.onPost('/video-files/scanner')
        .reply(200);
    mock.onGet('/video-files/scanner')
        .reply(200);
    mock.onPost('/video-files/play', newFile)
        .reply(200);
});

describe('VideoApiService', () => {
    it('Add File', async () => {
        try {
            const result = await VideoApiService.addVideoFile(newFile);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(newFile);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Update File', async () => {
        try {
            const result = await VideoApiService.updateVideoFile(1, newFile);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(newFile);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Search for Files', async () => {
        try {
            const result = await VideoApiService.searchForVideos({}, 0, 'ASC');
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(files);
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