import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const VideoListLayout = (props) => {
    return (
        <Container>
            <Row>
                <Col xs="12">
                    <h3>Search</h3>
                </Col>
                <Col xs="12">
                    <h3>List</h3>
                </Col>
            </Row>
        </Container>
    );
};

export default VideoListLayout;