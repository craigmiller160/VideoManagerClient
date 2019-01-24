import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import VideoSearch from './VideoSearch/VideoSearch';
import VideoList from './VideoList/VideoList';
import Alert from '../../UI/Alert/Alert';

const VideoListLayout = () => {
    return (
        <Container>
            <Row>
                <Col xs={{ size: 6, offset: 3 }}>
                    <Alert />
                </Col>
            </Row>
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