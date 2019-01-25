import React from 'react';
import { Row, Col } from 'reactstrap';
import VideoSearch from './VideoSearch/VideoSearch';
import VideoList from './VideoList/VideoList';

const VideoListLayout = () => {
    return (
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
};

export default VideoListLayout;