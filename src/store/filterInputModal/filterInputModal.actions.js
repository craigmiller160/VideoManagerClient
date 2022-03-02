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

import { createAction } from 'redux-starter-kit';
import { ADD_ACTION, CATEGORY_TYPE, SERIES_TYPE, STAR_TYPE } from './filterInputModal.constants';
import CategoryApiService from '../../services/CategoryApiService';
import { handleApiError, showErrorAlert, showSuccessAlert } from '../alert/alert.actions';
import { loadCategoryOptions, loadSeriesOptions, loadStarOptions } from '../videoSearch/videoSearch.actions';
import SeriesApiService from '../../services/SeriesApiService';
import StarApiService from '../../services/StarApiService';
import { getSelectedFilter } from './filterInputModal.selectors';
import { FORM_NAME } from '../../components/AppContent/VideoFileEdit/VideoFileEdit';
import { change } from 'redux-form';

export const deleteFilter = () => async (dispatch, getState) => {
    const state = getState();
    const type = state.filterInputModal.type;
    const selectedFilter = getSelectedFilter(state);

    if (!type || (!selectedFilter || selectedFilter === {})) {
        dispatch(showErrorAlert('Invalid state for deleting a filter'));
        return;
    }

    try {
        switch (type) {
            case CATEGORY_TYPE:
                await CategoryApiService.deleteCategory(selectedFilter.value);
                await dispatch(loadCategoryOptions());
                break;
            case SERIES_TYPE:
                await SeriesApiService.deleteSeries(selectedFilter.value);
                await dispatch(loadSeriesOptions());
                break;
            case STAR_TYPE:
                await StarApiService.deleteStar(selectedFilter.value);
                await dispatch(loadStarOptions());
                break;
            default:
                dispatch(showErrorAlert(`Invalid filter type ${type}`));
        }

        dispatch(showSuccessAlert(`Successfully deleted ${type} filter`));
    }
    catch (ex) {
        dispatch(handleApiError(ex));
    }
};

const addNewCategoryToEditForm = (newCategory) => (dispatch, getState) => {
    const state = getState();
    const form = state.form[FORM_NAME];
    if (!form) {
        return;
    }

    const categories = form.values.categories ?? [];
    const newCategoryFormItem = {
        value: newCategory.categoryId,
        label: newCategory.categoryName
    };
    dispatch(change(FORM_NAME, 'series', [...categories, newCategoryFormItem]));
};

const addNewStarToEditForm = (newStar) => (dispatch, getState) => {
    const state = getState();
    const form = state.form[FORM_NAME];
    if (!form) {
        return;
    }

    const stars = form.values.stars ?? [];
    const newStarFormItem = {
        value: newStar.starId,
        label: newStar.starName
    };
    dispatch(change(FORM_NAME, 'series', [...categories, newStarFormItem]));
};

const addNewSeriesToEditForm = (newSeries) => (dispatch, getState) => {
    const state = getState();
    const form = state.form[FORM_NAME];
    if (!form) {
        return;
    }

    const series = form.values.series ?? [];
    const newSeriesFormItem = {
        value: newSeries.seriesId,
        label: newSeries.seriesName
    };
    dispatch(change(FORM_NAME, 'series', [...series, newSeriesFormItem]));
};

export const saveFilterChanges = () => async (dispatch, getState) => {
    const state = getState();
    if (!state.form['filterInputForm']) {
        throw new Error('Cannot find filterInputForm in Redux store');
    }

    const type = state.filterInputModal.type;
    const action = state.filterInputModal.action;

    const form = state.form['filterInputForm'];
    const filter = {
        value: form.values['id'],
        label: form.values['name']
    };

    try {
        switch (type) {
            case CATEGORY_TYPE:
                await saveCategoryChanges(filter, action, dispatch);
                break;
            case SERIES_TYPE:
                await saveSeriesChanges(filter, action, dispatch);
                break;
            case STAR_TYPE:
                await saveStarChanges(filter, action, dispatch);
                break;
            default:
                dispatch(showErrorAlert(`Invalid type: ${type}`));
                break;
        }
        dispatch(showSuccessAlert(`Successfully saved ${type} filter`));
    }
    catch (ex) {
        dispatch(handleApiError(ex));
    }
};

const saveCategoryChanges = async (filter, action, dispatch) => {
    let category = {
        categoryId: filter.value,
        categoryName: filter.label
    };
    if (ADD_ACTION === action) {
        const res = await CategoryApiService.addCategory(category);
        category = res.data;
    }
    else {
        await CategoryApiService.updateCategory(category.categoryId, category);
    }
    await dispatch(loadCategoryOptions());
    if (ADD_ACTION === action) {
        dispatch(addNewCategoryToEditForm(category));
    }
};

const saveSeriesChanges = async (filter, action, dispatch) => {
    let series = {
        seriesId: filter.value,
        seriesName: filter.label
    };
    if (ADD_ACTION === action) {
        const res = await SeriesApiService.addSeries(series);
        series = res.data;
    }
    else {
        await SeriesApiService.updateSeries(filter.value, series);
    }
    await dispatch(loadSeriesOptions());
    if (ADD_ACTION === action) {
        dispatch(addNewSeriesToEditForm(series));
    }
};

const saveStarChanges = async (filter, action, dispatch) => {
    let star = {
        starId: filter.value,
        starName: filter.label
    };
    if (ADD_ACTION === action) {
        const res = await StarApiService.addStar(star);
        star = res.data;
    }
    else {
        await StarApiService.updateStar(filter.value, star);
    }
    await dispatch(loadStarOptions());
    if (ADD_ACTION === action) {
        dispatch(addNewStarToEditForm(star));
    }
};

export const showAddCategoryModal = createAction('filterInputModal/showAddCategoryModal');
export const showAddSeriesModal = createAction('filterInputModal/showAddSeriesModal');
export const showAddStarModal = createAction('filterInputModal/showAddStarModal');
export const showEditCategoryModal = createAction('filterInputModal/showEditCategoryModal');
export const showEditSeriesModal = createAction('filterInputModal/showEditSeriesModal');
export const showEditStarModal = createAction('filterInputModal/showEditStarModal');
export const hideFilterModal = createAction('filterInputModal/hideFilterModal');