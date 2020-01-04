import API from 'services/API';
import MockAdapter from 'axios-mock-adapter';
import { getFilesFromDirectory, getDirectoriesFromDirectory } from 'services/LocalFileApiService';
import {
    mockGetDirectoriesFromDirectory,
    mockGetFilesFromDirectory
} from '../exclude/mock/mockApiConfig/localFileApi';
import { BASE_FILES } from '../exclude/mock/mockData/localFileData';

const mockApi = new MockAdapter(API);

describe('LocalFileApiService', () => {
    beforeEach(() => {
        mockApi.reset();
        mockGetFilesFromDirectory(mockApi);
        mockGetDirectoriesFromDirectory(mockApi);
    });

    it('getFilesFromDirectory', async () => {
        const result = await getFilesFromDirectory('/home/user/directory');
        expect(result).toEqual(expect.objectContaining({
            status: 200,
            data: BASE_FILES
        }));
    });

    it('getDirectoriesFromDirectory', async () => {
        const result = await getDirectoriesFromDirectory('/home/user/directory');
        expect(result).toEqual(expect.objectContaining({
            status: 200,
            data: BASE_FILES.filter((file) => file.isDirectory)
        }));
    });
});
