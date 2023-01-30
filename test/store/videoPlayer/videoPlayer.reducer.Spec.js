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

import videoPlayerReducer, {
	initialState as videoPlayerInitState
} from 'store/videoPlayer/videoPlayer.reducer';
import {
	setLoading,
	setVideoFile,
	reset,
	setVideoToken
} from 'store/videoPlayer/videoPlayer.actions';
import { NEW_VIDEO_FILE_FULL } from '../../exclude/mock/mockData/videoFileData';

describe('videoPlayer.reducer', () => {
	it('should return initial state', () => {
		expect(videoPlayerReducer(undefined, {})).toEqual(videoPlayerInitState);
	});

	it('should handle setLoading', () => {
		const action = { type: setLoading.toString(), payload: false };
		const expectedState = {
			...videoPlayerInitState,
			loading: false
		};
		expect(videoPlayerReducer(videoPlayerInitState, action)).toEqual(
			expectedState
		);
	});

	it('should handle setVideoFile', () => {
		const action = {
			type: setVideoFile.toString(),
			payload: NEW_VIDEO_FILE_FULL
		};
		const expectedState = {
			...videoPlayerInitState,
			videoFile: NEW_VIDEO_FILE_FULL
		};
		expect(videoPlayerReducer(videoPlayerInitState, action)).toEqual(
			expectedState
		);
	});

	it('should handle reset', () => {
		const action = { type: reset.toString() };
		const state = {
			loading: false,
			videoFile: NEW_VIDEO_FILE_FULL
		};
		expect(videoPlayerReducer(state, action)).toEqual(videoPlayerInitState);
	});

	it('should handle set video token', () => {
		const token = 'ABCDEFG';
		const action = { type: setVideoToken.toString(), payload: token };
		const expectedState = {
			...videoPlayerInitState,
			videoToken: token
		};
		expect(videoPlayerReducer(videoPlayerInitState, action)).toEqual(
			expectedState
		);
	});
});
