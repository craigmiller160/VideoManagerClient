import { createAction } from 'redux-starter-kit';
import { ADD_ACTION, CATEGORY_TYPE, SERIES_TYPE, STAR_TYPE } from './filterInputModal.constants';
import CategoryApiService from '../../services/CategoryApiService';
import { handleApiError, showErrorAlert, showSuccessAlert } from '../alert/alert.actions';
import { loadCategoryOptions, loadSeriesOptions, loadStarOptions } from '../videoSearch/videoSearch.actions';
import SeriesApiService from '../../services/SeriesApiService';
import StarApiService from '../../services/StarApiService';
import { getSelectedFilter } from './filterInputModal.selectors';

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
    const category = {
        categoryId: filter.value,
        categoryName: filter.label
    };
    if (ADD_ACTION === action) {
        await CategoryApiService.addCategory(category);
    }
    else {
        await CategoryApiService.updateCategory(category.categoryId, category);
    }
    await dispatch(loadCategoryOptions());
};

const saveSeriesChanges = async (filter, action, dispatch) => {
    const series = {
        seriesId: filter.value,
        seriesName: filter.label
    };
    if (ADD_ACTION === action) {
        await SeriesApiService.addSeries(series);
    }
    else {
        await SeriesApiService.updateSeries(filter.value, series);
    }
    await dispatch(loadSeriesOptions());
};

const saveStarChanges = async (filter, action, dispatch) => {
    const star = {
        starId: filter.value,
        starName: filter.label
    };
    if (ADD_ACTION === action) {
        await StarApiService.addStar(star);
    }
    else {
        await StarApiService.updateStar(filter.value, star);
    }
    await dispatch(loadStarOptions());
};

export const showAddCategoryModal = createAction('filterInputModal/showAddCategoryModal');
export const showAddSeriesModal = createAction('filterInputModal/showAddSeriesModal');
export const showAddStarModal = createAction('filterInputModal/showAddStarModal');
export const showEditCategoryModal = createAction('filterInputModal/showEditCategoryModal');
export const showEditSeriesModal = createAction('filterInputModal/showEditSeriesModal');
export const showEditStarModal = createAction('filterInputModal/showEditStarModal');
export const hideFilterModal = createAction('filterInputModal/hideFilterModal');