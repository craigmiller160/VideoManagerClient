import React from 'react';
import { Row, Col } from 'reactstrap';
import VideoSearch from './VideoSearch/VideoSearch';
import VideoList from './VideoList/VideoList';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const VideoListLayout = (props) => {
    if (props.isScanning) {
        return <Redirect to="/scanning" />
    }

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

const mapStateToProps = (state) => ({
    isScanning: state.scanning.isScanning
});

export default connect(mapStateToProps, null)(VideoListLayout);