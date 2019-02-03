import React, { Component } from 'react';
import VideoNavbar from 'components/AppContent/VideoNavbar/VideoNavbar';
import VideoListLayout from './VideoListLayout/VideoListLayout';
import { Container, Row, Col } from 'reactstrap';
import Alert from '../UI/Alert/Alert';
import { Route, Switch, withRouter } from 'react-router-dom';
import Scanning from './Scanning/Scanning';
import { checkIsScanning, startFileScan } from 'store/scanning/scanning.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showErrorAlert, hideAlert } from 'store/alert/alert.actions';

export class AppContent extends Component {

    state = {
        isStarted: false
    };

    componentDidMount = async () => {
        try {
            await this.props.checkIsScanning();
            this.setState({ isStarted: true });
        }
        catch (ex) {
            this.props.showErrorAlert(ex.message);
        }
    };

    componentWillUpdate(nextProps) {
        if (nextProps.history.location.pathname !== '/' && !nextProps.isScanning) {
            this.props.history.push('/');
        }
    }

    render() {
        const {
            startFileScan,
            isScanning,
            checkIsScanning,
            alert,
            hideAlert
        } = this.props;
        const { isStarted } = this.state;

        return (
            <div>
                <VideoNavbar
                    startFileScan={ startFileScan }
                />
                {
                    isStarted &&
                        <Container>
                            <Row>
                                <Col xs={{ size: 8, offset: 2 }}>
                                    <Alert
                                        alert={ alert }
                                        hideAlert={ hideAlert }
                                    />
                                </Col>
                            </Row>
                            <Switch>
                                <Route
                                    path="/scanning"
                                    render={ (props) => (
                                        <Scanning
                                            { ...props }
                                            isScanning={ isScanning }
                                            checkIsScanning={ checkIsScanning }
                                        />
                                    ) }
                                />
                                <Route path="/"
                                       exact
                                       render={ (props) => (
                                           <VideoListLayout
                                               { ...props }
                                               isScanning={ isScanning }
                                           />
                                       ) }
                                />
                            </Switch>
                        </Container>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isScanning: state.scanning.isScanning,
    alert: state.alert
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    checkIsScanning,
    startFileScan,
    showErrorAlert,
    hideAlert
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContent));