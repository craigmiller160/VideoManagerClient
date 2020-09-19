/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
