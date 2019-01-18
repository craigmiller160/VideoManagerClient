import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import VideoSearch from './VideoSearch/VideoSearch';
import VideoList from './VideoList/VideoList';

const VideoListLayout = () => {
    return (
        <Container>
            <Row>
                <Col xs="12">
                    <VideoSearch />
                </Col>
                <Col xs="12">
                    <VideoList />
                </Col>
            </Row>
        </Container>
    );
};

export default VideoListLayout;