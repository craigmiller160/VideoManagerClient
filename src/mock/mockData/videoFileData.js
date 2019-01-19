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

export const FILE_COUNT = { totalFiles: 100, filesPerPage: 10 };

export const PAGINATION_COUNTS = { totalItems: 100, itemsPerPage: 10 };

export const EMPTY_SEARCH = { searchText: '', seriesId: 0, starId: 0, categoryId: 0 };