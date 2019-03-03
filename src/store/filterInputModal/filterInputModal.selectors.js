import { createSelector } from 'redux-starter-kit';
import { CATEGORY_TYPE, SERIES_TYPE, STAR_TYPE } from './filterInputModal.reducer';

export const getSelectedFilter = createSelector(
    [
        'videoSearch.filters',
        'filterInputModal.type',
        'filterInputModal.index'
    ],
    (filters, type, index) => {
        switch (type) {
            case CATEGORY_TYPE: return filters.categories[index];
            case SERIES_TYPE: return filters.series[index];
            case STAR_TYPE: return filters.stars[index];
            default:
                throw new Error(`Invalid filter type: ${type}`);
        }
    }
);