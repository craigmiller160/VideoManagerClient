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
	hideFilterModal,
	showAddCategoryModal,
	showAddSeriesModal,
	showAddStarModal,
	showEditCategoryModal,
	showEditSeriesModal,
	showEditStarModal
} from './filterInputModal.actions';
import {
	ADD_ACTION,
	CATEGORY_TYPE,
	EDIT_ACTION,
	SERIES_TYPE,
	STAR_TYPE
} from './filterInputModal.constants';

export const initialState = {
	open: false,
	type: '',
	action: '',
	index: -1
};

const handleShowAddCategoryModal = (state) => ({
	...state,
	open: true,
	type: CATEGORY_TYPE,
	action: ADD_ACTION
});

const handleShowAddSeriesModal = (state) => ({
	...state,
	open: true,
	type: SERIES_TYPE,
	action: ADD_ACTION
});

const handleShowAddStarModal = (state) => ({
	...state,
	open: true,
	type: STAR_TYPE,
	action: ADD_ACTION
});

const handleShowEditCategoryModal = (state, { payload }) => ({
	...state,
	open: true,
	type: CATEGORY_TYPE,
	action: EDIT_ACTION,
	index: payload
});

const handleShowEditSeriesModal = (state, { payload }) => ({
	...state,
	open: true,
	type: SERIES_TYPE,
	action: EDIT_ACTION,
	index: payload
});

const handleShowEditStarModal = (state, { payload }) => ({
	...state,
	open: true,
	type: STAR_TYPE,
	action: EDIT_ACTION,
	index: payload
});

const handleHideFilterModal = (state) => ({
	...state,
	open: false
});

export default createReducer(initialState, {
	[showAddCategoryModal]: handleShowAddCategoryModal,
	[showAddSeriesModal]: handleShowAddSeriesModal,
	[showAddStarModal]: handleShowAddStarModal,
	[showEditCategoryModal]: handleShowEditCategoryModal,
	[showEditSeriesModal]: handleShowEditSeriesModal,
	[showEditStarModal]: handleShowEditStarModal,
	[hideFilterModal]: handleHideFilterModal
});
