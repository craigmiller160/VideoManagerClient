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

import React, { useEffect } from 'react';
import classes from './VideoList.module.scss';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import VideoListItem from './VideoListItem/VideoListItem';
import { ListGroup } from 'reactstrap';
import { searchForVideos } from '../../../../store/videoList/videoList.actions';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import VideoListPagination from './VideoListPagination';

const VideoList = () => {
	const dispatch = useDispatch();
	const currentPage = useSelector(
		(state) => state.videoList.currentPage,
		shallowEqual
	);
	const videoList = useSelector(
		(state) => state.videoList.videoList,
		shallowEqual
	);
	const searching = useSelector(
		(state) => state.videoSearch.searching,
		shallowEqual
	);

	useEffect(() => {
		dispatch(searchForVideos());
	}, [currentPage, dispatch]);

	const [pager1, pager2] = [...Array(2).keys()].map((index) => (
		<VideoListPagination id={`video-pagination-${index}`} key={index} />
	));

	return (
		<div className={classes.VideoList}>
			<div className={classes['list-title']}>
				<h3 id="video-list-title">Available Videos</h3>
			</div>
			{searching && <Spinner />}
			{!searching && videoList.length > 0 && (
				<div id="video-list-contents-wrapper">
					{pager1}
					<ListGroup id="video-list-contents">
						{videoList.map((videoFile) => (
							<VideoListItem
								key={videoFile.fileId}
								videoFile={videoFile}
							/>
						))}
					</ListGroup>
					{pager2}
				</div>
			)}
			{!searching && videoList.length === 0 && (
				<div className={classes['none-available']}>
					<h3 id="no-videos-available">No Videos Available</h3>
				</div>
			)}
		</div>
	);
};

export default VideoList;
