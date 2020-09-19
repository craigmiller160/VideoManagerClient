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
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import classes from './VideoPlayerPage.scss';
import Spinner from '../../UI/Spinner/Spinner';
import { loadDataForPlayback } from 'store/videoPlayer/videoPlayer.actions';
import { Helmet } from 'react-helmet';
import VideoDate from '../../../model/VideoDate';
import WordWrapCol from '../../UI/WordWrapCol/WordWrapCol';
import VideoPlayer from './VideoPlayer';

const getFileName = (videoFile) => {
    return videoFile.displayName || videoFile.fileName;
};

const VideoPlayerPage = (props) => {
    const dispatch = useDispatch();
    const { loading, videoFile, videoToken } = useSelector((state) => state.videoPlayer, shallowEqual);
    const {
        match: { params }
    } = props;

    useEffect(() => {
        dispatch(loadDataForPlayback(params.fileId));
    }, []);

    const formattedLastViewed = videoFile.lastViewed ? new VideoDate(videoFile.lastViewed).formatDateTime() : '';
    const formattedFileAdded = videoFile.fileAdded ? new VideoDate(videoFile.fileAdded).formatDateTime() : '';

    return (
        <>
            <Helmet
                title={ getFileName(videoFile) }
            />
            <div className={ classes.VideoPlayerPage }>
                {
                    loading &&
                    <Row>
                        <Col className="text-center">
                            <Spinner />
                        </Col>
                    </Row>
                }
                {
                    !loading &&
                    <>
                        <Row>
                            <WordWrapCol className="text-center">
                                <div className={ classes.title }>
                                    <h3>{ getFileName(videoFile) }</h3>
                                </div>
                            </WordWrapCol>
                        </Row>
                        <Row>
                            <WordWrapCol className="text-center">
                                <VideoPlayer
                                    fileId={ params.fileId }
                                    videoToken={ videoToken }
                                />
                            </WordWrapCol>
                        </Row>
                        <Row>
                            <WordWrapCol className="mt-2 text-center">
                                <p className={ classes.bold }>{ videoFile.fileName }</p>
                            </WordWrapCol>
                        </Row>
                        <Row className="text-center">
                            <Col md="6">
                                <Row>
                                    <WordWrapCol>
                                        <p className={ classes.bold }>Description</p>
                                        <p>{ videoFile.description }</p>
                                    </WordWrapCol>
                                </Row>
                                <Row>
                                    <WordWrapCol>
                                        <p className={ classes.bold }>Views:</p>
                                        <p>{ videoFile.viewCount }</p>
                                    </WordWrapCol>
                                    <WordWrapCol>
                                        <p className={ classes.bold }>Last Viewed:</p>
                                        <p>{ formattedLastViewed }</p>
                                    </WordWrapCol>
                                    <WordWrapCol>
                                        <p className={ classes.bold }>File Added:</p>
                                        <p>{ formattedFileAdded }</p>
                                    </WordWrapCol>
                                </Row>
                            </Col>
                            <WordWrapCol md="6">
                                <p className={ classes.bold }>Categories</p>
                                <p>{
                                    videoFile.categories
                                        .map((cat) => cat.categoryName)
                                        .join(', ')
                                }</p>
                                <p className={ classes.bold }>Series</p>
                                <p>{
                                    videoFile.series
                                        .map((series) => series.seriesName)
                                        .join(', ')
                                }</p>
                                <p className={ classes.bold }>Stars</p>
                                <p>{
                                    videoFile.stars
                                        .map((star) => star.starName)
                                        .join(', ')
                                }</p>
                            </WordWrapCol>
                        </Row>
                    </>
                }
            </div>
        </>
    );
};
VideoPlayerPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object
    })
};

export default VideoPlayerPage;
