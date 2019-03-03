import { initialState as videoSearchInitState } from 'store/videoSearch/videoSearch.reducer';
import {
    CATEGORY_TYPE,
    initialState as filterInputInitState,
    SERIES_TYPE, STAR_TYPE
} from 'store/filterInputModal/filterInputModal.reducer';
import { getSelectedFilter } from 'store/filterInputModal/filterInputModal.selectors';

const category = { value: 1, label: 'Cat1' };
const series = { value: 1, label: 'Series1' };
const star = { value: 1, label: 'Star1' };

describe('filterInputModal.selectors', () => {
    let state;

    beforeEach(() => {
        state = {
            videoSearch: {
                ...videoSearchInitState,
                filters: {
                    ...videoSearchInitState.filters,
                    categories: videoSearchInitState.filters.categories.concat(category),
                    series: videoSearchInitState.filters.series.concat(series),
                    stars: videoSearchInitState.filters.stars.concat(star)
                }
            },
            filterInputModal: filterInputInitState
        };
        state.filterInputModal.index = 0;
    });

    describe('getSelectedFilter', () => {
        it('gets selected category', () => {
            state.filterInputModal.type = CATEGORY_TYPE;
            const result = getSelectedFilter(state);
            expect(result).toEqual(category);
        });

        it('gets selected series', () => {
            state.filterInputModal.type = SERIES_TYPE;
            const result = getSelectedFilter(state);
            expect(result).toEqual(series);
        });

        it('gets selected star', () => {
            state.filterInputModal.type = STAR_TYPE;
            const result = getSelectedFilter(state);
            expect(result).toEqual(star);
        });
    });
});