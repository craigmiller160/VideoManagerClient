import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setCategories, setSeries, setStars, loadFilterOptions, setSearching } from "../videoSearch.actions";
import MockAdapter from 'axios-mock-adapter';
import API from '../../../services/API';
import { BASE_CATEGORIES, BASE_CATEGORY_FILTERS } from '../../../mock/mockData/categoryData';
import { BASE_SERIES, BASE_SERIES_FILTERS } from '../../../mock/mockData/seriesData';
import { BASE_STAR_FILTERS, BASE_STARS } from '../../../mock/mockData/starData';
import { mockGetAllCategories } from '../../../mock/mockApiConfig/categoryApi';
import { mockGetAllSeries } from '../../../mock/mockApiConfig/seriesApi';
import { mockGetAllStars } from '../../../mock/mockApiConfig/starApi';
import { initialState as videoSearchInitState } from '../videoSearch.reducer';

const mockStore = configureMockStore([thunk]);
const mockApi = new MockAdapter(API);

describe('videoSearch.actions', () => {
    describe('setCategories action', () => {
        it('creates the action', () => {
            const expectedAction = {
                type: setCategories.toString(),
                payload: BASE_CATEGORIES
            };
            const action = setCategories(BASE_CATEGORIES);
            expect(action).toEqual(expectedAction);
        });
    });

    describe('setSeries action', () => {
        it('creates the action', () => {
            const expectedAction = {
                type: setSeries.toString(),
                payload: BASE_SERIES
            };
            const action = setSeries(BASE_SERIES);
            expect(action).toEqual(expectedAction);
        });
    });

    describe('setStars action', () => {
        it('creates the action', () => {
            const expectedAction = {
                type: setStars.toString(),
                payload: BASE_STARS
            };
            const action = setStars(BASE_STARS);
            expect(action).toEqual(expectedAction);
        });
    });

    describe('setSearching action', () => {
        const expectedAction = {
            type: setSearching.toString(),
            payload: true
        };
        const action = setSearching(true);
        expect(action).toEqual(expectedAction);
    });

    describe('asynchronous thunk actions', () => {
        let store;

        beforeEach(() => {
            mockApi.reset();
            mockGetAllCategories(mockApi);
            mockGetAllSeries(mockApi);
            mockGetAllStars(mockApi);

            store = mockStore({ videoSearch: videoSearchInitState });
        });

        describe('loadFilterOptions action', () => {
            it('loads the data', async () => {
                const expectedActions = [
                    { type: setCategories.toString(), payload: BASE_CATEGORY_FILTERS },
                    { type: setSeries.toString(), payload: BASE_SERIES_FILTERS },
                    { type: setStars.toString(), payload: BASE_STAR_FILTERS }
                ];

                try {
                    await store.dispatch(loadFilterOptions());
                }
                catch (ex) {
                    console.log('Error', ex);
                    expect(ex).toBeUndefined();
                }
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
});
