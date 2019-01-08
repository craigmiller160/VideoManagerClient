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
    mock.onPost('/video-files', newFile)
        .reply(200, newFile);
    mock.onPut('/video-files/1', newFile)
        .reply(200, newFile);
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
});