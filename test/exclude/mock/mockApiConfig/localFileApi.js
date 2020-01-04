import qs from 'qs';
import { BASE_FILES } from '../mockData/localFileData';

export const mockGetFilesFromDirectory = (mockApi) => {
    mockApi.onGet(`/localfiles/directory?${qs.stringify({ path: '/home/user/directory' })}`)
        .reply(200, BASE_FILES);
};

export const mockGetDirectoriesFromDirectory = (mockApi) => {
    mockApi.onGet(`/localfiles/directory?${qs.stringify({ path: '/home/user/directory', onlyDirectories: true })}`)
        .reply(200, BASE_FILES.filter((file) => file.isDirectory));
};
