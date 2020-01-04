import qs from 'qs';
import { BASE_FILES } from '../mockData/localFileData';

export const mockGetFilesFromDirectory = (mockApi) => {
    mockApi.onGet(`/localfiles/directory?${qs.stringify({ path: '/home/user/directory' })}`)
        .reply(200, BASE_FILES);
};
