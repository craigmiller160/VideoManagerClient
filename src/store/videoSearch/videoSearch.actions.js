import { createAction } from 'redux-starter-kit';
import CategoryApiService from '../../services/CategoryApiService';
import SeriesApiService from '../../services/SeriesApiService';
import StarApiService from '../../services/StarApiService';

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
        // TODO need error handling in UI
        console.log('Error!', ex);
    }
};

export const setCategories = createAction('setCategories');
export const setSeries = createAction('setSeries');
export const setStars = createAction('setStars');