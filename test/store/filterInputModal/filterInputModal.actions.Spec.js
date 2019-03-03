import {
    hideFilterModal, saveFilterChanges,
    showAddCategoryModal,
    showAddSeriesModal,
    showAddStarModal, showEditCategoryModal, showEditSeriesModal, showEditStarModal
} from 'store/filterInputModal/filterInputModal.actions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import API from 'services/API';
import MockAdapter from 'axios-mock-adapter';
import {
    mockAddNewCategory,
    mockGetAllCategories,
    mockUpdateCategory
} from '../../exclude/mock/mockApiConfig/categoryApi';
import { mockAddNewSeries, mockGetAllSeries, mockUpdateSeries } from '../../exclude/mock/mockApiConfig/seriesApi';
import { mockAddNewStar, mockGetAllStars, mockUpdateStar } from '../../exclude/mock/mockApiConfig/starApi';
import {
    ADD_ACTION,
    CATEGORY_TYPE, EDIT_ACTION,
    initialState as filterInputInitState, SERIES_TYPE, STAR_TYPE
} from 'store/filterInputModal/filterInputModal.reducer';
import { setCategories, setSeries, setStars } from '../../../src/store/videoSearch/videoSearch.actions';
import { BASE_CATEGORY_FILTERS, NEW_CATEGORY_FILTER } from '../../exclude/mock/mockData/categoryData';
import { BASE_SERIES_FILTERS, NEW_SERIES_FILTER } from '../../exclude/mock/mockData/seriesData';
import { BASE_STAR_FILTERS, NEW_STAR_FILTER } from '../../exclude/mock/mockData/starData';

const mockStore = configureMockStore([thunk]);
const mockApi = new MockAdapter(API);

describe('filterInputModal.actions', () => {
    it('showAddCategoryModal action', () => {
        const expectedAction = { type: showAddCategoryModal.toString() };
        const action = showAddCategoryModal();
        expect(action).toEqual(expectedAction);
    });

    it('showAddSeriesModal action', () => {
        const expectedAction = { type: showAddSeriesModal.toString() };
        const action = showAddSeriesModal();
        expect(action).toEqual(expectedAction);
    });

    it('showAddStarModal action', () => {
        const expectedAction = { type: showAddStarModal.toString() };
        const action = showAddStarModal();
        expect(action).toEqual(expectedAction);
    });

    it('showEditCategoryModal action', () => {
        const expectedAction = { type: showEditCategoryModal.toString(), payload: 1 };
        const action = showEditCategoryModal(1);
        expect(action).toEqual(expectedAction);
    });

    it('showEditSeriesModal action', () => {
        const expectedAction = { type: showEditSeriesModal.toString(), payload: 1 };
        const action = showEditSeriesModal(1);
        expect(action).toEqual(expectedAction);
    });

    it('showEditStarModal action', () => {
        const expectedAction = { type: showEditStarModal.toString(), payload: 1 };
        const action = showEditStarModal(1);
        expect(action).toEqual(expectedAction);
    });

    it('hideFilterModal action', () => {
        const expectedAction = { type: hideFilterModal.toString() };
        const action = hideFilterModal();
        expect(action).toEqual(expectedAction);
    });

    describe('saveFilterChanges action', () => {
        let store;

        beforeEach(() => {
            mockApi.reset();

            mockAddNewCategory(mockApi);
            mockUpdateCategory(mockApi);
            mockGetAllCategories(mockApi);

            mockAddNewSeries(mockApi);
            mockUpdateSeries(mockApi);
            mockGetAllSeries(mockApi);

            mockAddNewStar(mockApi);
            mockUpdateStar(mockApi);
            mockGetAllStars(mockApi);
        });

        it('add new category', async () => {
            const initState = {
                ...filterInputInitState,
                type: CATEGORY_TYPE,
                action: ADD_ACTION
            };
            store = mockStore({ filterInputModal: initState });
            const expectedActions = [
                { type: setCategories.toString(), payload: BASE_CATEGORY_FILTERS }
            ];

            try {
                await store.dispatch(saveFilterChanges(NEW_CATEGORY_FILTER));
            }
            catch (ex) {
                expect(ex).toBeUndefined();
            }
            expect(store.getActions()).toEqual(expectedActions);
            expect(mockApi.history).toEqual(expect.objectContaining({
                get: [
                    expect.objectContaining({
                        url: expect.stringMatching(/\/categories$/)
                    })
                ],
                post: [
                    expect.objectContaining({
                        url: expect.stringMatching(/\/categories$/)
                    })
                ]
            }));
        });

        it('edit category', async () => {
            const initState = {
                ...filterInputInitState,
                type: CATEGORY_TYPE,
                action: EDIT_ACTION
            };
            store = mockStore({ filterInputModal: initState });
            const expectedActions = [
                { type: setCategories.toString(), payload: BASE_CATEGORY_FILTERS }
            ];
            try {
                await store.dispatch(saveFilterChanges(NEW_CATEGORY_FILTER));
            }
            catch (ex) {
                expect(ex).toBeUndefined();
            }
            expect(store.getActions()).toEqual(expectedActions);
            expect(mockApi.history).toEqual(expect.objectContaining({
                get: [
                    expect.objectContaining({
                        url: expect.stringMatching(/\/categories$/)
                    })
                ],
                put: [
                    expect.objectContaining({
                        url: expect.stringMatching(/\/categories\/3$/)
                    })
                ]
            }));
        });

        it('add new series', async () => {
            const initState = {
                ...filterInputInitState,
                type: SERIES_TYPE,
                action: ADD_ACTION
            };
            store = mockStore({ filterInputModal: initState });
            const expectedActions = [
                { type: setSeries.toString(), payload: BASE_SERIES_FILTERS }
            ];
            try {
                await store.dispatch(saveFilterChanges(NEW_SERIES_FILTER));
            }
            catch (ex) {
                expect(ex).toBeUndefined();
            }
            expect(store.getActions()).toEqual(expectedActions);
            expect(mockApi.history).toEqual(expect.objectContaining({
                get: [
                    expect.objectContaining({
                        url: expect.stringMatching(/\/series$/)
                    })
                ],
                post: [
                    expect.objectContaining({
                        url: expect.stringMatching(/\/series$/)
                    })
                ]
            }));
        });

        it('edit series', async () => {
            const initState = {
                ...filterInputInitState,
                type: SERIES_TYPE,
                action: EDIT_ACTION
            };
            store = mockStore({ filterInputModal: initState });
            const expectedActions = [
                { type: setSeries.toString(), payload: BASE_SERIES_FILTERS }
            ];
            try {
                await store.dispatch(saveFilterChanges(NEW_SERIES_FILTER));
            }
            catch (ex) {
                expect(ex).toBeUndefined();
            }
            expect(store.getActions()).toEqual(expectedActions);
            expect(mockApi.history).toEqual(expect.objectContaining({
                get: [
                    expect.objectContaining({
                        url: expect.stringMatching(/\/series$/)
                    })
                ],
                put: [
                    expect.objectContaining({
                        url: expect.stringMatching(/\/series\/3$/)
                    })
                ]
            }));
        });

        it('add new star', async () => {
            const initState = {
                ...filterInputInitState,
                type: STAR_TYPE,
                action: ADD_ACTION
            };
            store = mockStore({ filterInputModal: initState });
            const expectedActions = [
                { type: setStars.toString(), payload: BASE_STAR_FILTERS }
            ];
            try {
                await store.dispatch(saveFilterChanges(NEW_STAR_FILTER));
            }
            catch (ex) {
                expect(ex).toBeUndefined();
            }
            expect(store.getActions()).toEqual(expectedActions);
            expect(mockApi.history).toEqual(expect.objectContaining({
                get: [
                    expect.objectContaining({
                        url: expect.stringMatching(/\/stars$/)
                    })
                ],
                post: [
                    expect.objectContaining({
                        url: expect.stringMatching(/\/stars$/)
                    })
                ]
            }));
        });

        it('edit star', async () => {
            const initState = {
                ...filterInputInitState,
                type: STAR_TYPE,
                action: EDIT_ACTION
            };
            store = mockStore({ filterInputModal: initState });
            const expectedActions = [
                { type: setStars.toString(), payload: BASE_STAR_FILTERS }
            ];
            try {
                await store.dispatch(saveFilterChanges(NEW_STAR_FILTER));
            }
            catch (ex) {
                expect(ex).toBeUndefined();
            }
            expect(store.getActions()).toEqual(expectedActions);
            expect(mockApi.history).toEqual(expect.objectContaining({
                get: [
                    expect.objectContaining({
                        url: expect.stringMatching(/\/stars$/)
                    })
                ],
                put: [
                    expect.objectContaining({
                        url: expect.stringMatching(/\/stars\/3$/)
                    })
                ]
            }));
        });
    });
});