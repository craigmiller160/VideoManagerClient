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

import qs from 'qs';
import { BASE_FILES } from '../mockData/localFileData';

export const mockGetFilesFromDirectory = (mockApi) => {
	mockApi
		.onGet(
			`/localfiles/directory?${qs.stringify({
				path: '/home/user/directory'
			})}`
		)
		.reply(200, BASE_FILES);
};

export const mockGetDirectoriesFromDirectory = (mockApi) => {
	mockApi
		.onGet(
			`/localfiles/directory?${qs.stringify({
				path: '/home/user/directory',
				onlyDirectories: true
			})}`
		)
		.reply(
			200,
			BASE_FILES.filter((file) => file.isDirectory)
		);
};
