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

import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = (props) => {
	const { fileId, videoToken } = props;
	const videoUri = `/video-manager/api/video-files/play/${fileId}?videoToken=${videoToken}`;
	return (
		// eslint-disable-next-line jsx-a11y/media-has-caption
		<video controls autoPlay="autoPlay">
			<source src={videoUri} />
		</video>
	);
};
VideoPlayer.propTypes = {
	fileId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	videoToken: PropTypes.string.isRequired
};

export default VideoPlayer;
