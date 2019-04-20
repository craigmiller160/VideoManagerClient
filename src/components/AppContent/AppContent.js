import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VideoNavbar from 'components/AppContent/VideoNavbar/VideoNavbar';
import VideoListLayout from './VideoListLayout/VideoListLayout';
import { Col, Container, Row } from 'reactstrap';
import Alert from '../UI/Alert/Alert';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import Scanning from './Scanning/Scanning';
import { checkIsScanning, startFileScan } from 'store/scanning/scanning.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideAlert, showErrorAlert } from 'store/alert/alert.actions';
import VideoFileEdit from './VideoFileEdit/VideoFileEdit';
import { getSelectedVideoWithFilters } from 'store/videoList/videoList.selectors';
import ManageVideoFilters from './ManageVideoFilters/ManageVideoFilters';
import classes from './AppContent.scss';
import { loadFilterOptions } from 'store/videoSearch/videoSearch.actions';
import { saveVideoFileEdits } from 'store/videoList/videoList.actions';
import VideoPlayer from './VideoPlayer/VideoPlayer';

const resetToRootComponent = (props) => {
    const {
        history: { location },
        isScanning,
        selectedVideo
    } = props;

    if (location.pathname === '/scanning' && !isScanning) {
        return true;
    }

    return location.pathname === '/edit' && (!selectedVideo || !selectedVideo.fileName);
};

const handleRouting = (props) => {
    const {
        history,
        isScanning
    } = props;

    if (resetToRootComponent(props)) {
        history.push('/');
    }
    else if (isScanning && history.location.pathname !== '/scanning') {
        history.push('/scanning');
    }
};

const startupCheck = async (props, setStarted) => {
    const {
        loadFilterOptions,
        checkIsScanning,
        showErrorAlert
    } = props;
    try {
        loadFilterOptions();
        await checkIsScanning();
        setStarted(true);
    }
    catch (ex) {
        showErrorAlert(ex.message);
    }
};

export const AppContent = (props) => {
    const [ isStarted, setStarted ] = useState(false);
    const {
        checkIsScanning,
        saveVideoFileEdits,
        history,
        isScanning,
        selectedVideo,
        startFileScan,
        alert,
        hideAlert
    } = props;

    useEffect(() => {
        startupCheck(props, setStarted);
    }, []);

    useEffect(() => {
        handleRouting(props);
        return () => handleRouting(props);
    }, [history, isScanning, selectedVideo]);

    const saveFileChanges = async () => {
        await saveVideoFileEdits();
        history.push('/');
    };

    return (
        <div className={ classes.AppContent }>
            <VideoNavbar
                startFileScan={ startFileScan }
                isScanning={ isScanning }
            />
            {
                isStarted &&
                <Container className={ classes.container }>
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
                                    checkIsScanning={ checkIsScanning }
                                />
                            ) }
                        />
                        <Route
                            path="/edit"
                            render={ (props) => (
                                <VideoFileEdit
                                    { ...props }
                                    selectedVideo={ selectedVideo }
                                    saveFileChanges={ saveFileChanges }
                                />
                            ) }
                        />
                        <Route
                            path="/filters"
                            render={ (props) => (
                                <ManageVideoFilters
                                    { ...props }
                                />
                            ) }
                        />
                        <Route
                            path="/play/:fileId"
                            render={ (props) => (
                                <VideoPlayer { ...props } />
                            ) }
                        />
                        <Route path="/"
                               exact
                               render={ (props) => (
                                   <VideoListLayout
                                       { ...props }
                                   />
                               ) }
                        />
                    </Switch>
                </Container>
            }
        </div>
    );
};

AppContent.propTypes = {
    isScanning: PropTypes.bool,
    alert: PropTypes.object,
    selectedVideo: PropTypes.object,
    checkIsScanning: PropTypes.func,
    startFileScan: PropTypes.func,
    showErrorAlert: PropTypes.func,
    loadFilterOptions: PropTypes.func,
    hideAlert: PropTypes.func,
    saveVideoFileEdits: PropTypes.func,
    history: PropTypes.object
};

const mapStateToProps = (state) => ({
    isScanning: state.scanning.isScanning,
    alert: state.alert,
    selectedVideo: getSelectedVideoWithFilters(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    checkIsScanning,
    startFileScan,
    showErrorAlert,
    loadFilterOptions,
    hideAlert,
    saveVideoFileEdits
}, dispatch);

const AppContentWrapped = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContent));
AppContentWrapped.propTypes = {};
export default AppContentWrapped;