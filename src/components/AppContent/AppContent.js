import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VideoNavbar from 'components/AppContent/VideoNavbar/VideoNavbar';
import { Col, Container, Row } from 'reactstrap';
import Alert from '../UI/Alert/Alert';
import { withRouter } from 'react-router';
import { checkIsScanning, startFileScan } from 'store/scanning/scanning.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideAlert, showErrorAlert } from 'store/alert/alert.actions';
import { getSelectedVideoWithFilters } from 'store/videoList/videoList.selectors';
import classes from './AppContent.scss';
import { loadFilterOptions } from 'store/videoSearch/videoSearch.actions';
import { saveVideoFileEdits } from 'store/videoList/videoList.actions';
import AppRoutes from './AppRoutes';
import { checkAuth } from '../../store/auth/auth.actions';

const resetToListComponent = (props) => {
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
        isScanning,
        isAuth
    } = props;

    if (!isAuth) {
        history.push('/login');
    }
    else if (resetToListComponent(props)) {
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
        showErrorAlert,
        checkAuth
    } = props;
    try {
        const isAuth = await checkAuth();
        if (isAuth) {
            loadFilterOptions();
            await checkIsScanning(); // TODO need to still do this check after login
        }
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
        hideAlert,
        isAuth
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
                disabled={ isScanning || !isAuth }
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
                    <AppRoutes
                        saveFileChanges={ saveFileChanges }
                        checkIsScanning={ checkIsScanning }
                        selectedVideo={ selectedVideo }
                    />
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
    showErrorAlert: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    loadFilterOptions: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    hideAlert: PropTypes.func,
    saveVideoFileEdits: PropTypes.func,
    history: PropTypes.object,
    checkAuth: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    isAuth: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isScanning: state.scanning.isScanning,
    alert: state.alert,
    selectedVideo: getSelectedVideoWithFilters(state),
    isAuth: state.auth.isAuth
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    checkIsScanning,
    startFileScan,
    showErrorAlert,
    loadFilterOptions,
    hideAlert,
    saveVideoFileEdits,
    checkAuth
}, dispatch);

const AppContentWrapped = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContent));
AppContentWrapped.propTypes = {};
export default AppContentWrapped;