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
    initialState as filterInputInitState
} from 'store/filterInputModal/filterInputModal.reducer';
import { setCategories } from '../../../src/store/videoSearch/videoSearch.actions';
import { BASE_CATEGORY_FILTERS, NEW_CATEGORY_FILTER } from '../../exclude/mock/mockData/categoryData';

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
        const expectedAction = { type: showEditCategoryModal.toString() };
        const action = showEditCategoryModal();
        expect(action).toEqual(expectedAction);
    });

    it('showEditSeriesModal action', () => {
        const expectedAction = { type: showEditSeriesModal.toString() };
        const action = showEditSeriesModal();
        expect(action).toEqual(expectedAction);
    });

    it('showEditStarModal action', () => {
        const expectedAction = { type: showEditStarModal.toString() };
        const action = showEditStarModal();
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
            }))
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
            }))
        });

        it('add new series', () => {
            throw new Error('Finish this');
        });

        it('edit series', () => {
            throw new Error('Finish this');
        });

        it('add new star', () => {
            throw new Error('Finish this');
        });

        it('edit star', () => {
            throw new Error('Finish this');
        });
    });
});