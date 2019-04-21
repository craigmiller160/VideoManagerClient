
const convertToOptions = (array) =>
    array.map((value) => ({ value, label: value }));

export const SORT_BY_NAME = 'Name';
export const SORT_BY_VIEWS = 'Views';
export const SORT_BY_LAST_VIEWED = 'Last Viewed';
export const SORT_BY_LAST_MOD = 'Last Modified';
export const SORT_BY_OPTIONS = convertToOptions([
    SORT_BY_NAME,
    SORT_BY_VIEWS,
    SORT_BY_LAST_VIEWED,
    SORT_BY_LAST_MOD
]);

export const SORT_ASC = 'Ascending';
export const SORT_DESC = 'Descending';
export const SORT_DIR_OPTIONS = convertToOptions([
    SORT_ASC,
    SORT_DESC
]);