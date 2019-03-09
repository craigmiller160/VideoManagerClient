import React, { useState, useEffect } from 'react';
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
import VideoFileEdit from './VideoFileEdit/VideoFileEdit';
import { getSelectedVideoWithFilters } from 'store/videoList/videoList.selectors';
import ManageVideoFilters from './ManageVideoFilters/ManageVideoFilters';
import classes from './AppContent.scss';
import { loadFilterOptions } from 'store/videoSearch/videoSearch.actions';
import { saveVideoFileEdits } from 'store/videoList/videoList.actions';

const resetToRootComponent = (props) => {
    const {
        history: { location },
        isScanning,
        selectedVideo
    } = props;

    if (location.pathname === '/scanning' && !isScanning) {
        return true;
    }

    return location.pathname === '/edit' && (!selectedVideo || Object.entries(selectedVideo).length === 0);
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

const AppContent = (props) => {
    const [ isStarted, setStarted ] = useState(false);
    const {
        checkIsScanning,
        saveVideoFileEdits,
        history,
        isScanning,
        selectedVideo,
        startFileScan,
        alert,
        hideAlert,
        filters
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
                                    isScanning={ isScanning }
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
                                    filters={ filters }
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
};

const mapStateToProps = (state) => ({
    isScanning: state.scanning.isScanning,
    alert: state.alert,
    selectedVideo: getSelectedVideoWithFilters(state),
    filters: state.videoSearch.filters
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    checkIsScanning,
    startFileScan,
    showErrorAlert,
    loadFilterOptions,
    hideAlert,
    saveVideoFileEdits
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContent));