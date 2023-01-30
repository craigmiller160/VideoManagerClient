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
	setLoading,
	setVideoFile,
	reset,
	setVideoToken
} from './videoPlayer.actions';

export const initialState = {
	loading: true,
	videoFile: {},
	videoToken: ''
};

const handleSetLoading = (state, action) => ({
	...state,
	loading: action.payload
});

const handleSetVideoFile = (state, action) => ({
	...state,
	videoFile: action.payload
});

const handleReset = () => ({
	...initialState
});

const handleSetVideoToken = (state, action) => ({
	...state,
	videoToken: action.payload
});

export default createReducer(initialState, {
	[setLoading]: handleSetLoading,
	[setVideoFile]: handleSetVideoFile,
	[reset]: handleReset,
	[setVideoToken]: handleSetVideoToken
});
