import videoSearchReducer, { initialState as videoSearchInitState } from '../../../src/store/videoSearch/videoSearch.reducer';
import { setCategories, setSearching, setSeries, setStars } from '../../../src/store/videoSearch/videoSearch.actions';
import { BASE_CATEGORIES } from '../../exclude/mock/mockData/categoryData';
import { BASE_SERIES } from '../../exclude/mock/mockData/seriesData';
import { BASE_STARS } from '../../exclude/mock/mockData/starData';

const cloneState = () => ({
    ...videoSearchInitState,
    filters: {
        ...videoSearchInitState.filters
    }
});

describe('videoSearch.reducer', () => {
    it('should return initial state', () => {
        expect(videoSearchReducer(undefined, {})).toEqual(videoSearchInitState);
    });

    it('should handle setCategories', () => {
        const action = { type: setCategories.toString(), payload: BASE_CATEGORIES };
        const expectedState = cloneState();
        expectedState.filters.categories = BASE_CATEGORIES;
        expect(videoSearchReducer(undefined, action)).toEqual(expectedState);
    });

    it('should handle setSeries', () => {
        const action = { type: setSeries.toString(), payload: BASE_SERIES };
        const expectedState = cloneState();
        expectedState.filters.series = BASE_SERIES;
        expect(videoSearchReducer(undefined, action)).toEqual(expectedState);
    });

    it('should handle setStars', () => {
        const action = { type: setStars.toString(), payload: BASE_STARS };
        const expectedState = cloneState();
        expectedState.filters.stars = BASE_STARS;
        expect(videoSearchReducer(undefined, action)).toEqual(expectedState);
    });

    it('should handle setSearching', () => {
        const action = { type: setSearching.toString(), payload: true };
        const expectedState = {
            ...cloneState(),
            searching: true
        };
        expect(videoSearchReducer(undefined, action)).toEqual(expectedState);
    });
});