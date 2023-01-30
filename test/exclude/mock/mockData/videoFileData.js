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

import { NEW_CATEGORY, NEW_CATEGORY_FILTER } from './categoryData';
import { NEW_SERIES, NEW_SERIES_FILTER } from './seriesData';
import { NEW_STAR, NEW_STAR_FILTER } from './starData';

export const BASE_VIDE0_FILES = [
	{ fileId: 1, fileName: 'FirstFile' },
	{ fileId: 2, fileName: 'SecondFile' }
];

export const BASE_VIDEO_FILES_STATE = BASE_VIDE0_FILES.map((videoFile) => ({
	...videoFile,
	expanded: false
}));

export const BASE_VIDEO_SEARCH_RESULT = {
	totalFiles: 100,
	filesPerPage: 10,
	currentPage: 0,
	videoList: BASE_VIDE0_FILES
};

export const NEW_VIDEO_FILE = { fileId: 3, fileName: 'ThirdFile' };

export const NEW_VIDEO_FILE_FULL = {
	...NEW_VIDEO_FILE,
	categories: [NEW_CATEGORY],
	series: [NEW_SERIES],
	stars: [NEW_STAR]
};

export const NEW_VIDEO_FILE_FULL_FILTERS = {
	...NEW_VIDEO_FILE,
	categories: [NEW_CATEGORY_FILTER],
	series: [NEW_SERIES_FILTER],
	stars: [NEW_STAR_FILTER]
};

export const FILE_COUNT = { totalFiles: 100, filesPerPage: 10 };

export const PAGINATION_COUNTS = { totalItems: 100, itemsPerPage: 10 };

export const EMPTY_SEARCH = {
	searchText: '',
	seriesId: 0,
	starId: 0,
	categoryId: 0,
	sortBy: 'NAME',
	sortDir: 'ASC',
	page: 0
};

export const FULL_SEARCH = {
	searchText: 'Hello World',
	seriesId: 1,
	starId: 1,
	categoryId: 1,
	page: 0,
	sortBy: 'NAME',
	sortDir: 'ASC'
};

export const FILE_SCAN_STATUS = { inProgress: true, scanError: false };
