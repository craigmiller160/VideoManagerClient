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

import { createReducer } from 'redux-starter-kit';
import {
	setCategories,
	setStars,
	setSeries,
	setSearching
} from './videoSearch.actions';

export const initialState = {
	filters: {
		categories: [],
		stars: [],
		series: []
	},
	searching: false
};

const handleSetCategories = (state, action) => ({
	...state,
	filters: {
		...state.filters,
		categories: action.payload || []
	}
});

const handleSetStars = (state, action) => ({
	...state,
	filters: {
		...state.filters,
		stars: action.payload || []
	}
});

const handleSetSeries = (state, action) => ({
	...state,
	filters: {
		...state.filters,
		series: action.payload || []
	}
});

const handleSetSearching = (state, action) => ({
	...state,
	searching: action.payload
});

export default createReducer(initialState, {
	[setCategories]: handleSetCategories,
	[setStars]: handleSetStars,
	[setSeries]: handleSetSeries,
	[setSearching]: handleSetSearching
});
