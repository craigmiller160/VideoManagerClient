import React from 'react';
import VideoNavbar from './VideoNavbar/VideoNavbar';
import VideoListLayout from './VideoListLayout/VideoListLayout';
import { Container, Row, Col } from 'reactstrap';
import Alert from '../UI/Alert/Alert';
import { Route } from 'react-router-dom';
import Scanning from './Scanning/Scanning';

const AppContent = () => {
    return (
        <div>
            <VideoNavbar />
            <Container>
                <Row>
                    <Col xs={{ size: 8, offset: 2 }}>
                        <Alert />
                    </Col>
                </Row>
                <Route path="/scanning" component={ Scanning } />
                <Route path="/" component={ VideoListLayout } exact />
            </Container>
        </div>
    );
};

export default AppContent;