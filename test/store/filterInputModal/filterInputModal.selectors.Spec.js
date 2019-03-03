import { initialState as videoSearchInitState } from 'store/videoSearch/videoSearch.reducer';
import { CATEGORY_TYPE, initialState as filterInputInitState } from 'store/filterInputModal/filterInputModal.reducer';
import { getSelectedFilter } from 'store/filterInputModal/filterInputModal.selectors';

describe('filterInputModal.selectors', () => {
    let state;

    beforeEach(() => {
        state = {
            videoSearch: {
                ...videoSearchInitState,
                categories: videoSearchInitState.filters.categories.push({ value: 1, label: 'Cat1' })
            },
            filterInputModal: filterInputInitState
        };
        // state.videoSearch.filters.categories.push({ value: 1, label: 'Cat1' });
        state.videoSearch.filters.series.push({ value: 1, label: 'Series1' });
        state.videoSearch.filters.stars.push({ value: 1, label: 'Star1' });
        state.filterInputModal.index = 0;
    });

    describe('getSelectedFilter', () => {
        it('gets selected category', () => {
            state.filterInputModal.type = CATEGORY_TYPE;
            getSelectedFilter(state);
        });

        it('gets selected series', () => {
            throw new Error('Finish this');
        });

        it('gets selected star', () => {
            throw new Error('Finish this');
        });
    });
});