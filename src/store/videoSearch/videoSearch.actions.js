import { createAction } from 'redux-starter-kit';
import CategoryApiService from '../../services/CategoryApiService';
import SeriesApiService from '../../services/SeriesApiService';
import StarApiService from '../../services/StarApiService';
import { showErrorAlert } from '../alert/alert.actions';

export const loadFilterOptions = () => async (dispatch) => {
    try {
        let res = await CategoryApiService.getAllCategories();
        const categories = (res.data || [])
            .map(category => ({ value: category.categoryId, label: category.categoryName }));
        res = await SeriesApiService.getAllSeries();
        const series = (res.data || [])
            .map(s => ({ value: s.seriesId, label: s.seriesName }));
        res = await StarApiService.getAllStars();
        const stars = (res.data || [])
            .map(star => ({ value: star.starId, label: star.starName }));

        dispatch(setCategories(categories));
        dispatch(setSeries(series));
        dispatch(setStars(stars));
    }
    catch (ex) {
        console.log(ex);
        dispatch(showErrorAlert(ex.message));
    }
};

export const setCategories = createAction('setCategories');
export const setSeries = createAction('setSeries');
export const setStars = createAction('setStars');
export const setSearching = createAction('setSearching');