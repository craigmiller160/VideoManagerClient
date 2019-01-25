import React, { Component } from 'react';
import VideoNavbar from './VideoNavbar/VideoNavbar';
import VideoListLayout from './VideoListLayout/VideoListLayout';
import { Container, Row, Col } from 'reactstrap';
import Alert from '../UI/Alert/Alert';
import { Route } from 'react-router-dom';
import Scanning from './Scanning/Scanning';
import { checkIsScanning } from '../../store/scanning/scanning.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AppContent extends Component {

    componentDidMount() {
        this.props.checkIsScanning();
    }

    render() {
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
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    checkIsScanning
}, dispatch);

export default connect(null, mapDispatchToProps)(AppContent);