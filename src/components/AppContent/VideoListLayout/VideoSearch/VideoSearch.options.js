
const convertToOptions = (array) =>
    array.map((value) => ({ value, label: value }));

export const SORT_BY_NAME = 'Name';
export const SORT_BY_VIEWS = 'Views';
export const SORT_BY_LAST_VIEWED = 'Last Viewed';
export const SORT_BY_FILE_ADDED = 'File Added';
export const SORT_BY_OPTIONS = convertToOptions([
    SORT_BY_FILE_ADDED,
    SORT_BY_LAST_VIEWED,
    SORT_BY_NAME,
    SORT_BY_VIEWS
]);

export const SORT_ASC = 'Ascending';
export const SORT_DESC = 'Descending';
export const SORT_DIR_OPTIONS = convertToOptions([
    SORT_DESC,
    SORT_ASC
]);