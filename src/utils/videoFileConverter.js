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

export const convertFileToFilters = (videoFile) => ({
	...videoFile,
	categories:
		videoFile && videoFile.categories
			? videoFile.categories.map(convertCategoryToFilter)
			: [],
	series:
		videoFile && videoFile.series
			? videoFile.series.map(convertSeriesToFilter)
			: [],
	stars:
		videoFile && videoFile.stars
			? videoFile.stars.map(convertStarToFilter)
			: []
});

export const convertFiltersToFile = (videoFile) => ({
	...videoFile,
	categories:
		videoFile && videoFile.categories
			? videoFile.categories.map(convertFilterToCategory)
			: [],
	series:
		videoFile && videoFile.series
			? videoFile.series.map(convertFilterToSeries)
			: [],
	stars:
		videoFile && videoFile.stars
			? videoFile.stars.map(convertFilterToStar)
			: []
});

export const convertCategoryToFilter = (category) => ({
	value: category.categoryId,
	label: category.categoryName
});

export const convertFilterToCategory = (category) => ({
	categoryId: category.value,
	categoryName: category.label
});

export const convertSeriesToFilter = (series) => ({
	value: series.seriesId,
	label: series.seriesName
});

export const convertFilterToSeries = (series) => ({
	seriesId: series.value,
	seriesName: series.label
});

export const convertStarToFilter = (star) => ({
	value: star.starId,
	label: star.starName
});

export const convertFilterToStar = (star) => ({
	starId: star.value,
	starName: star.label
});
