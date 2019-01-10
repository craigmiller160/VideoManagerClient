import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import VideoSearch from './VideoSearch/VideoSearch';

const VideoListLayout = () => {
    return (
        <Container>
            <Row>
                <Col xs="12">
                    <VideoSearch />
                </Col>
                <Col xs="12">
                    <h3>List</h3>
                </Col>
            </Row>
        </Container>
    );
};

export default VideoListLayout;