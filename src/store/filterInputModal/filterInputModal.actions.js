import { createAction } from 'redux-starter-kit';
import { ADD_ACTION, CATEGORY_TYPE, SERIES_TYPE, STAR_TYPE } from './filterInputModal.reducer';
import CategoryApiService from '../../services/CategoryApiService';
import { showErrorAlert } from '../alert/alert.actions';
import {
    loadCategoryOptions,
    loadSeriesOptions,
    loadStarOptions
} from '../videoSearch/videoSearch.actions';
import SeriesApiService from '../../services/SeriesApiService';
import StarApiService from '../../services/StarApiService';

export const deleteFilter = () => async (dispatch, getState) => {
    // TODO finish this
    console.log('Deleting'); // TODO delete this
};

export const saveFilterChanges = () => async (dispatch, getState) => {
    const state = getState();
    const type = state.filterInputModal.type;
    const action = state.filterInputModal.action;
    if (!state.form['filterInputForm']) {
        throw new Error('Cannot find filterInputForm in Redux store');
    }

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
    }
    catch (ex) {
        console.log(ex);
        dispatch(showErrorAlert(ex.message));
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

export const showAddCategoryModal = createAction('showAddCategoryModal');
export const showAddSeriesModal = createAction('showAddSeriesModal');
export const showAddStarModal = createAction('showAddStarModal');
export const showEditCategoryModal = createAction('showEditCategoryModal');
export const showEditSeriesModal = createAction('showEditSeriesModal');
export const showEditStarModal = createAction('showEditStarModal');
export const hideFilterModal = createAction('hideFilterModal');