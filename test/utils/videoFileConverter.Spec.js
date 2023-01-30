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
	convertCategoryToFilter,
	convertFileToFilters,
	convertFiltersToFile,
	convertFilterToCategory,
	convertFilterToSeries,
	convertFilterToStar,
	convertSeriesToFilter,
	convertStarToFilter
} from '../../src/utils/videoFileConverter';
import {
	NEW_CATEGORY,
	NEW_CATEGORY_FILTER
} from '../exclude/mock/mockData/categoryData';
import {
	NEW_SERIES,
	NEW_SERIES_FILTER
} from '../exclude/mock/mockData/seriesData';
import { NEW_STAR, NEW_STAR_FILTER } from '../exclude/mock/mockData/starData';
import {
	NEW_VIDEO_FILE_FULL,
	NEW_VIDEO_FILE_FULL_FILTERS
} from '../exclude/mock/mockData/videoFileData';

describe('videoFileConverter', () => {
	it('convertDefaultToFilters', () => {
		const result = convertFileToFilters(NEW_VIDEO_FILE_FULL);
		expect(result).toEqual(NEW_VIDEO_FILE_FULL_FILTERS);
	});

	it('convertFiltersToDefault', () => {
		const result = convertFiltersToFile(NEW_VIDEO_FILE_FULL_FILTERS);
		expect(result).toEqual(NEW_VIDEO_FILE_FULL);
	});

	it('convertCategoryToFilter', () => {
		const result = convertCategoryToFilter(NEW_CATEGORY);
		expect(result).toEqual(NEW_CATEGORY_FILTER);
	});

	it('convertFilterToCategory', () => {
		const result = convertFilterToCategory(NEW_CATEGORY_FILTER);
		expect(result).toEqual(NEW_CATEGORY);
	});

	it('convertSeriesToFilter', () => {
		const result = convertSeriesToFilter(NEW_SERIES);
		expect(result).toEqual(NEW_SERIES_FILTER);
	});

	it('convertFilterToSeries', () => {
		const result = convertFilterToSeries(NEW_SERIES_FILTER);
		expect(result).toEqual(NEW_SERIES);
	});

	it('convertStarToFilter', () => {
		const result = convertStarToFilter(NEW_STAR);
		expect(result).toEqual(NEW_STAR_FILTER);
	});

	it('convertFilterToStar', () => {
		const result = convertFilterToStar(NEW_STAR_FILTER);
		expect(result).toEqual(NEW_STAR);
	});
});
