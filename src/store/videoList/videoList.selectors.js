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

import { createSelector } from 'redux-starter-kit';
import { convertFileToFilters } from '../../utils/videoFileConverter';

const findSelectedVideo = (videoList) => {
	const matches = videoList.filter((file) => file.expanded);
	if (matches.length > 0) {
		return matches[0];
	}
	return {};
};

export const getSelectedVideo = createSelector(
	['videoList.videoList'],
	(videoList = []) => findSelectedVideo(videoList)
);

export const getSelectedVideoWithFilters = createSelector(
	['videoList.videoList'],
	(videoList = []) => {
		const selectedVideo = findSelectedVideo(videoList);
		return convertFileToFilters(selectedVideo);
	}
);
