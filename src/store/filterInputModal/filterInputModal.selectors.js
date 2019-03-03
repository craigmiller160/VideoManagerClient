import { createSelector } from 'redux-starter-kit';

export const getSelectedFilter = createSelector(
    [
        'videoSearch.filters',
        'filterInputModal.type',
        'filterInputModal.index'
    ],
    (filters = [], type, index) => {
        console.log(filters);
        console.log(type);
        console.log(index);
    }
);