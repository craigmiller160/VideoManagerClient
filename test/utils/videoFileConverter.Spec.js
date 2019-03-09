import {
    convertCategoryToFilter, convertFileToFilters, convertFiltersToFile,
    convertFilterToCategory, convertFilterToSeries, convertFilterToStar,
    convertSeriesToFilter, convertStarToFilter
} from '../../src/utils/videoFileConverter';
import { NEW_CATEGORY, NEW_CATEGORY_FILTER } from '../exclude/mock/mockData/categoryData';
import { NEW_SERIES, NEW_SERIES_FILTER } from '../exclude/mock/mockData/seriesData';
import { NEW_STAR, NEW_STAR_FILTER } from '../exclude/mock/mockData/starData';
import { NEW_VIDEO_FILE_FULL, NEW_VIDEO_FILE_FULL_FILTERS } from '../exclude/mock/mockData/videoFileData';

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