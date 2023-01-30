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
import classes from './VideoListItem.module.scss';
import {
	ListGroupItem,
	ListGroupItemHeading,
	ListGroupItemText,
	Row,
	Button,
	Collapse
} from 'reactstrap';
import { Link } from 'react-router-dom';
import VideoDate from 'model/VideoDate';
import WordWrapCol from 'components/UI/WordWrapCol/WordWrapCol';
import { useDispatch, useSelector } from 'react-redux';
import { reset as videoPlayerReset } from 'store/videoPlayer/videoPlayer.actions';
import { expandVideoFile } from '../../../../../store/videoList/videoList.actions';
import { hasEditRole as hasEditRoleSelector } from '../../../../../store/auth/auth.selectors';

const VideoListItem = (props) => {
	const dispatch = useDispatch();
	const hasEditRole = useSelector(hasEditRoleSelector);
	const {
		videoFile: {
			fileId,
			fileName,
			displayName,
			description,
			categories,
			series,
			stars,
			expanded,
			viewCount,
			lastViewed,
			fileAdded
		}
	} = props;

	const leftColSize = 6;
	const rootClasses = [classes.VideoListItem];
	if (expanded) {
		rootClasses.push(classes.active);
	}
	const actualDisplayName = displayName || fileName;
	const formattedLastViewed = lastViewed
		? new VideoDate(lastViewed).formatDateTime()
		: '';
	const formattedFileAdded = fileAdded
		? new VideoDate(fileAdded).formatDateTime()
		: '';

	const playVideoClick = async () => {
		await dispatch(videoPlayerReset());
		window.open(`/video-manager/play/${fileId}`, '_blank');
	};

	return (
		<div
			data-name={`video-list-item-${fileId}`}
			className={rootClasses.join(' ')}
			onClick={() => dispatch(expandVideoFile(fileId))}
		>
			<ListGroupItem>
				<Row>
					<WordWrapCol xs={leftColSize}>
						<ListGroupItemHeading className={classes.heading}>
							{actualDisplayName}
						</ListGroupItemHeading>
					</WordWrapCol>
					<WordWrapCol>
						<span
							data-name="series-label"
							className={classes.label}
						>
							Series:
						</span>
					</WordWrapCol>
					<WordWrapCol className="text-center">
						<span
							data-name="categories-label"
							className={classes.label}
						>
							Categories:
						</span>
					</WordWrapCol>
					<WordWrapCol className="text-right">
						<span data-name="stars-label" className={classes.label}>
							Stars:
						</span>
					</WordWrapCol>
				</Row>
				<Row>
					<WordWrapCol xs={leftColSize}>
						<ListGroupItemText data-name="description-text">
							{description}
						</ListGroupItemText>
					</WordWrapCol>
					<WordWrapCol>
						<ListGroupItemText data-name="series-text">
							{series.map((s) => s.seriesName).join(', ')}
						</ListGroupItemText>
					</WordWrapCol>
					<WordWrapCol className="text-center">
						<ListGroupItemText data-name="categories-text">
							{categories
								.map((cat) => cat.categoryName)
								.join(', ')}
						</ListGroupItemText>
					</WordWrapCol>
					<WordWrapCol className="text-right">
						<ListGroupItemText data-name="stars-text">
							{stars.map((star) => star.starName).join(', ')}
						</ListGroupItemText>
					</WordWrapCol>
				</Row>
				<Collapse isOpen={expanded}>
					<Row>
						<WordWrapCol xs={leftColSize}>
							<p
								data-name="file-name-label"
								className={classes.heading}
							>
								File Name:
							</p>
							<p data-name="file-name-text">{fileName}</p>
						</WordWrapCol>
						<WordWrapCol>
							<p
								data-name="views-label"
								className={classes.label}
							>
								Views:
							</p>
							<p
								data-name="views-text"
								className={classes['push-text']}
							>
								{viewCount}
							</p>
						</WordWrapCol>
						<WordWrapCol className="text-center">
							<p
								data-name="last-viewed-label"
								className={classes.label}
							>
								Last Viewed:
							</p>
							<p data-name="last-viewed-text">
								{formattedLastViewed}
							</p>
						</WordWrapCol>
						<WordWrapCol className="text-right">
							<p
								data-name="file-added-label"
								className={classes.label}
							>
								File Added:
							</p>
							<p data-name="file-added-text">
								{formattedFileAdded}
							</p>
						</WordWrapCol>
					</Row>
					<Row>
						<WordWrapCol className="text-right">
							{hasEditRole && (
								<Link to="/edit">
									<Button data-name="edit-btn" color="info">
										Edit
									</Button>
								</Link>
							)}
							<Button
								data-name="play-btn"
								color="primary"
								onClick={playVideoClick}
							>
								Play
							</Button>
						</WordWrapCol>
					</Row>
				</Collapse>
			</ListGroupItem>
		</div>
	);
};

VideoListItem.propTypes = {
	videoFile: PropTypes.object.isRequired
};

export default VideoListItem;
