import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import VideoSearch from './VideoSearch/VideoSearch';
import VideoList from './VideoList/VideoList';

const VideoListLayout = () => (
    <>
        <Row>
            <Col xs="12">
                <VideoSearch />
            </Col>
        </Row>
        <Row>
            <Col xs="12">
                <VideoList />
            </Col>
        </Row>
    </>
);

VideoListLayout.propTypes = {
    isScanning: PropTypes.bool.isRequired
};

export default VideoListLayout;