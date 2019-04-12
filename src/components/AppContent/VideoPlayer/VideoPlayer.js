/* eslint-disable */ // TODO delete this
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import classes from './VideoPlayer.scss';
import Spinner from '../../UI/Spinner/Spinner';
import VideoApiService from 'services/VideoApiService';

const getFileName = (videoFile) => {
    return videoFile.displayName || videoFile.fileName;
};

const VideoPlayer = (props) => {
    const [ loading, setLoading ] = useState(true);

    return (
        <div className={ classes.VideoPlayer }>
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
                <Row>
                    <Col className="text-center">
                        <h3 className={ classes.title }>{ getFileName(videoFile) }</h3>
                    </Col>
                </Row>
            }
        </div>
    );
};

export default VideoPlayer;