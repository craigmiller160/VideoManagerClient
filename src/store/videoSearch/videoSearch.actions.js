import { createAction } from 'redux-starter-kit';
import CategoryApiService from '../../services/CategoryApiService';
import SeriesApiService from '../../services/SeriesApiService';
import StarsApiService from '../../services/StarsApiService';

export const loadFilterOptions = () => async (dispatch) => {
    try {
        const categories = await CategoryApiService.getAllCategories();
        const series = await SeriesApiService.getAllSeries();
        const stars = await StarsApiService.getAllStars();

        dispatch(setCategories(categories));
        dispatch(setSeries(series));
        dispatch(setStars(stars));
    }
    catch (ex) {
        // TODO need error handling in UI
        console.log('Error!', ex);
    }
};

export const setCategories = createAction('setCategories');
export const setSeries = createAction('setSeries');
export const setStars = createAction('setStars');