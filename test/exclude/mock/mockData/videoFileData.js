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
    categories: [ NEW_CATEGORY ],
    series: [ NEW_SERIES ],
    stars: [ NEW_STAR ]
};

export const NEW_VIDEO_FILE_FULL_FILTERS = {
    ...NEW_VIDEO_FILE,
    categories: [ NEW_CATEGORY_FILTER ],
    series: [ NEW_SERIES_FILTER ],
    stars: [ NEW_STAR_FILTER ]
};

export const FILE_COUNT = { totalFiles: 100, filesPerPage: 10 };

export const PAGINATION_COUNTS = { totalItems: 100, itemsPerPage: 10 };

export const EMPTY_SEARCH = { searchText: '', seriesId: 0, starId: 0, categoryId: 0 };

export const FULL_SEARCH = { searchText: 'Hello World', seriesId: 1, starId: 1, categoryId: 1 };

export const FILE_SCAN_STATUS = { inProgress: true, scanError: false };