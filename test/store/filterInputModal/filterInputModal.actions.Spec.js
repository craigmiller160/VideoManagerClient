/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {
    hideFilterModal, saveFilterChanges, deleteFilter,
    showAddCategoryModal,
    showAddSeriesModal,
    showAddStarModal, showEditCategoryModal, showEditSeriesModal, showEditStarModal
} from 'store/filterInputModal/filterInputModal.actions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import API from 'services/API';
import MockAdapter from 'axios-mock-adapter';
import {
    mockAddNewCategory, mockDeleteCategory,
    mockGetAllCategories,
    mockUpdateCategory
} from '../../exclude/mock/mockApiConfig/categoryApi';
import {
    mockAddNewSeries,
    mockDeleteSeries,
    mockGetAllSeries,
    mockUpdateSeries
} from '../../exclude/mock/mockApiConfig/seriesApi';
import {
    mockAddNewStar,
    mockDeleteStar,
    mockGetAllStars,
    mockUpdateStar
} from '../../exclude/mock/mockApiConfig/starApi';
import { ADD_ACTION,
    CATEGORY_TYPE, EDIT_ACTION,
    SERIES_TYPE, STAR_TYPE
} from 'store/filterInputModal/filterInputModal.constants';
import { initialState as filterInputInitState } from 'store/filterInputModal/filterInputModal.reducer';
import {
    setCategories,
    setSeries,
    setStars
} from 'store/videoSearch/videoSearch.actions';
import { BASE_CATEGORY_FILTERS, NEW_CATEGORY_FILTER } from '../../exclude/mock/mockData/categoryData';
import { BASE_SERIES_FILTERS, NEW_SERIES_FILTER } from '../../exclude/mock/mockData/seriesData';
import { BASE_STAR_FILTERS, NEW_STAR_FILTER } from '../../exclude/mock/mockData/starData';
import { showErrorAlert, showSuccessAlert } from 'store/alert/alert.actions';

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

        const getStateFormValues = (type) => {
            switch (type) {
                case CATEGORY_TYPE: return NEW_CATEGORY_FILTER;
                case SERIES_TYPE: return NEW_SERIES_FILTER;
                case STAR_TYPE: return NEW_STAR_FILTER;
                default:
                    throw new Error(`Invalid type: ${type}`);
            }
        };

        const createState = (action, type) => ({
            filterInputModal: {
                ...filterInputInitState,
                type,
                action
            },
            form: {
                filterInputForm: {
                    values: {
                        id: getStateFormValues(type).value,
                        name: getStateFormValues(type).label
                    }
                }
            }
        });

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

        it('fails if cannot find form', async () => {
            store = mockStore({ form: {} });
            try {
                await store.dispatch(saveFilterChanges(NEW_CATEGORY_FILTER));
            }
            catch (ex) {
                expect(ex.message).toContain('Cannot find filterInputForm in Redux store');
                return;
            }
            throw new Error('Operation should have thrown an exception');
        });

        it('add new category', async () => {
            store = mockStore(createState(ADD_ACTION, CATEGORY_TYPE));
            const expectedActions = [
                { type: setCategories.toString(), payload: BASE_CATEGORY_FILTERS },
                { type: showSuccessAlert.toString(), payload: 'Successfully saved Category filter' }
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
            store = mockStore(createState(EDIT_ACTION, CATEGORY_TYPE));
            const expectedActions = [
                { type: setCategories.toString(), payload: BASE_CATEGORY_FILTERS },
                { type: showSuccessAlert.toString(), payload: 'Successfully saved Category filter' }
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
            store = mockStore(createState(ADD_ACTION, SERIES_TYPE));
            const expectedActions = [
                { type: setSeries.toString(), payload: BASE_SERIES_FILTERS },
                { type: showSuccessAlert.toString(), payload: 'Successfully saved Series filter' }
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
            store = mockStore(createState(EDIT_ACTION, SERIES_TYPE));
            const expectedActions = [
                { type: setSeries.toString(), payload: BASE_SERIES_FILTERS },
                { type: showSuccessAlert.toString(), payload: 'Successfully saved Series filter' }
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
            store = mockStore(createState(ADD_ACTION, STAR_TYPE));
            const expectedActions = [
                { type: setStars.toString(), payload: BASE_STAR_FILTERS },
                { type: showSuccessAlert.toString(), payload: 'Successfully saved Star filter' }

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
            store = mockStore(createState(EDIT_ACTION, STAR_TYPE));
            const expectedActions = [
                { type: setStars.toString(), payload: BASE_STAR_FILTERS },
                { type: showSuccessAlert.toString(), payload: 'Successfully saved Star filter' }

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

    describe('deleteFilter action', () => {
        const createState = (type) => ({
            filterInputModal: {
                ...filterInputInitState,
                type,
                index: 2
            },
            videoSearch: {
                filters: {
                    categories: BASE_CATEGORY_FILTERS.concat(NEW_CATEGORY_FILTER),
                    series: BASE_SERIES_FILTERS.concat(NEW_SERIES_FILTER),
                    stars: BASE_STAR_FILTERS.concat(NEW_STAR_FILTER)
                }
            }
        });

        beforeEach(() => {
            mockApi.reset();

            mockDeleteCategory(mockApi);
            mockDeleteSeries(mockApi);
            mockDeleteStar(mockApi);

            mockGetAllCategories(mockApi);
            mockGetAllSeries(mockApi);
            mockGetAllStars(mockApi);
        });

        it('fails without type', async () => {
            const store = mockStore(createState(null));
            const expectedActions = [
                { type: showErrorAlert.toString(), payload: 'Invalid state for deleting a filter' }
            ];
            try {
                await store.dispatch(deleteFilter());
            }
            catch (ex) {
                expect(ex).toBeUndefined();
            }
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('deletes category', async () => {
            const store = mockStore(createState(CATEGORY_TYPE));
            const expectedActions = [
                { type: setCategories.toString(), payload: BASE_CATEGORY_FILTERS },
                { type: showSuccessAlert.toString(), payload: 'Successfully deleted Category filter' }
            ];
            try {
                await store.dispatch(deleteFilter());
            }
            catch (ex) {
                expect(ex).toBeUndefined();
            }
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('deletes series', async () => {
            const store = mockStore(createState(SERIES_TYPE));
            const expectedActions = [
                { type: setSeries.toString(), payload: BASE_SERIES_FILTERS },
                { type: showSuccessAlert.toString(), payload: 'Successfully deleted Series filter' }
            ];
            try {
                await store.dispatch(deleteFilter());
            }
            catch (ex) {
                expect(ex).toBeUndefined();
            }
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('deletes star', async () => {
            const store = mockStore(createState(STAR_TYPE));
            const expectedActions = [
                { type: setStars.toString(), payload: BASE_STAR_FILTERS },
                { type: showSuccessAlert.toString(), payload: 'Successfully deleted Star filter' }
            ];
            try {
                await store.dispatch(deleteFilter());
            }
            catch (ex) {
                expect(ex).toBeUndefined();
            }
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});