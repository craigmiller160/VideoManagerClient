import { createAction } from 'redux-starter-kit';
import CategoryApiService from '../../services/CategoryApiService';
import SeriesApiService from '../../services/SeriesApiService';
import StarApiService from '../../services/StarApiService';
import { handleApiError, showErrorAlert } from '../alert/alert.actions';
import { convertCategoryToFilter, convertSeriesToFilter, convertStarToFilter } from '../../utils/videoFileConverter';

export const loadFilterOptions = () => async (dispatch) => {
    try {
        await dispatch(loadCategoryOptions());
        await dispatch(loadSeriesOptions());
        await dispatch(loadStarOptions());
    }
    catch (ex) {
        dispatch(handleApiError(ex));
    }
};

export const loadCategoryOptions = () => async (dispatch) => {
    const res = await CategoryApiService.getAllCategories();
    const categories = (res.data || [])
        .map(convertCategoryToFilter);
    dispatch(setCategories(categories));
};

export const loadSeriesOptions = () => async (dispatch) => {
    const res = await SeriesApiService.getAllSeries();
    const series = (res.data || [])
        .map(convertSeriesToFilter);
    dispatch(setSeries(series));
};

export const loadStarOptions = () => async (dispatch) => {
    const res = await StarApiService.getAllStars();
    const stars = (res.data || [])
        .map(convertStarToFilter);
    dispatch(setStars(stars));
};

export const setCategories = createAction('videoSearch/setCategories');
export const setSeries = createAction('videoSearch/setSeries');
export const setStars = createAction('videoSearch/setStars');
export const setSearching = createAction('videoSearch/setSearching');