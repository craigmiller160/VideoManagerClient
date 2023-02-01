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

import {
	BASE_VIDEO_SEARCH_RESULT,
	EMPTY_SEARCH,
	FILE_COUNT,
	FILE_SCAN_STATUS,
	FULL_SEARCH,
	NEW_VIDEO_FILE,
	NEW_VIDEO_FILE_FULL
} from '../mockData/videoFileData';

export const mockAddNewVideoFile = (mockApi) => {
	mockApi.onPost('/video-files', NEW_VIDEO_FILE).reply(200, NEW_VIDEO_FILE);
};

export const mockUpdateVideoFile = (mockApi) => {
	mockApi.onPut('/video-files/3', NEW_VIDEO_FILE).reply(200, NEW_VIDEO_FILE);
};

export const mockUpdateFullVideoFile = (mockApi) => {
	mockApi
		.onPut('/video-files/3', NEW_VIDEO_FILE_FULL)
		.reply(200, NEW_VIDEO_FILE_FULL);
};

export const mockSearchForFiles = (mockApi) => {
	mockApi
		.onPost('/video-files/search', FULL_SEARCH)
		.reply(200, BASE_VIDEO_SEARCH_RESULT);
};

export const mockGetAllFiles = (mockApi) => {
	mockApi
		.onPost('/video-files/search', EMPTY_SEARCH)
		.reply(200, BASE_VIDEO_SEARCH_RESULT);
};

export const mockStartVideoScan = (mockApi) => {
	mockApi.onPost('/video-files/scanner').reply(200, FILE_SCAN_STATUS);
};

export const mockIsVideoScanRunning = (mockApi) => {
	mockApi.onGet('/video-files/scanner').reply(200, FILE_SCAN_STATUS);
};

export const mockGetVideoFile = (mockApi) => {
	mockApi.onGet('/video-files/3').reply(200, NEW_VIDEO_FILE_FULL);
};

export const mockGetVideoFileCount = (mockApi) => {
	mockApi.onGet('/video-files/count').reply(200, FILE_COUNT);
};

export const mockRecordNewVideoPlay = (mockApi) => {
	mockApi.onGet('/video-files/record-play/3').reply(200);
};
