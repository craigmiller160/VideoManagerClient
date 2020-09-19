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
import CategoryApiService from '../../services/CategoryApiService';
import SeriesApiService from '../../services/SeriesApiService';
import StarApiService from '../../services/StarApiService';
import { handleApiError } from '../alert/alert.actions';
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