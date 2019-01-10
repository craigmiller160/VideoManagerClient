import React, { Component } from 'react';
import { Row, Col, Input } from 'reactstrap';


class VideoSearch extends Component {
    render() {
        return (
            <Row>
                <Col sm="6" md="3">
                    <Input />
                </Col>
                <Col sm="6" md="3">
                    <p>Test</p>
                </Col>
                <Col sm="6" md="3">
                    <p>Test</p>
                </Col>
                <Col sm="6" md="3">
                    <p>Test</p>
                </Col>
            </Row>
        );
    }
}

export default VideoSearch;