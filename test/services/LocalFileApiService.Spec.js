import API from 'services/API';
import MockAdapter from 'axios-mock-adapter';
import { getFilesFromDirectory } from 'services/LocalFileApiService';
import { mockGetFilesFromDirectory } from '../exclude/mock/mockApiConfig/localFileApi';
import { BASE_FILES } from '../exclude/mock/mockData/localFileData';

const mockApi = new MockAdapter(API);

describe('LocalFileApiService', () => {
    beforeEach(() => {
        mockApi.reset();
        mockGetFilesFromDirectory(mockApi);
    });

    it('getFilesFromDirectory', async () => {
        const result = await getFilesFromDirectory('/home/user/directory');
        expect(result).toEqual(expect.objectContaining({
            status: 200,
            data: BASE_FILES
        }));
    });
});
