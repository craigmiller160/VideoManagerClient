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

import videoListReducer, {
	initialState as videoListInitState
} from 'store/videoList/videoList.reducer';
import {
	expandVideoFile,
	setCurrentPage,
	setPagination,
	setVideoList
} from 'store/videoList/videoList.actions';
import {
	BASE_VIDE0_FILES,
	BASE_VIDEO_FILES_STATE,
	PAGINATION_COUNTS
} from '../../exclude/mock/mockData/videoFileData';

const cloneState = () => ({
	...videoListInitState,
	pagination: {
		...videoListInitState.pagination
	}
});

describe('videoSearch.reducer', () => {
	it('should return initial state', () => {
		expect(videoListReducer(undefined, {})).toEqual(videoListInitState);
	});

	it('should handle setVideoList', () => {
		const action = {
			type: setVideoList.toString(),
			payload: BASE_VIDE0_FILES
		};
		const expectedState = cloneState();
		expectedState.videoList = BASE_VIDEO_FILES_STATE;
		expect(videoListReducer(undefined, action)).toEqual(expectedState);
	});

	it('should handle setPagination', () => {
		const action = {
			type: setPagination.toString(),
			payload: PAGINATION_COUNTS
		};
		const expectedState = cloneState();
		expectedState.pagination = PAGINATION_COUNTS;
		expect(videoListReducer(undefined, action)).toEqual(expectedState);
	});

	it('should handle setCurrentPage', () => {
		const action = { type: setCurrentPage.toString(), payload: 5 };
		const expectedState = {
			...cloneState(),
			currentPage: 5
		};
		expect(videoListReducer(undefined, action)).toEqual(expectedState);
	});

	it('should handle expandVideoFile', () => {
		const action = { type: expandVideoFile.toString(), payload: 1 };
		const state = {
			...cloneState(),
			videoList: BASE_VIDEO_FILES_STATE.map((videoFile) => {
				if (videoFile.fileId === 2) {
					return {
						...videoFile,
						expanded: true
					};
				}
				return {
					...videoFile
				};
			})
		};
		const expectedState = {
			...cloneState(),
			videoList: BASE_VIDEO_FILES_STATE.map((videoFile) => {
				if (videoFile.fileId === 1) {
					return {
						...videoFile,
						expanded: true
					};
				}
				return {
					...videoFile
				};
			})
		};
		expect(videoListReducer(state, action)).toEqual(expectedState);
	});
});
