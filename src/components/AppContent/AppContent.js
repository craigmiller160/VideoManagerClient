import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VideoNavbar from 'components/AppContent/VideoNavbar/VideoNavbar';
import { Col, Container, Row } from 'reactstrap';
import Alert from '../UI/Alert/Alert';
import { checkIsScanning } from 'store/scanning/scanning.actions';
import { bindActionCreators } from 'redux';
import { connect, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { hideAlert, showErrorAlert } from 'store/alert/alert.actions';
import { getSelectedVideoWithFilters } from 'store/videoList/videoList.selectors';
import classes from './AppContent.scss';
import { loadFilterOptions } from 'store/videoSearch/videoSearch.actions';
import { saveVideoFileEdits } from 'store/videoList/videoList.actions';
import AppRoutes from './AppRoutes';
import { checkAuth, logout } from '../../store/auth/auth.actions';

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//     showErrorAlert,
//     loadFilterOptions,
//     hideAlert,
//     saveVideoFileEdits,
//     checkAuth,
//     logout
// }, dispatch);

export const AppContent = (props) => {
    const [ isStarted, setStarted ] = useState(false);
    const { history } = useReactRouter();
    const dispatch = useDispatch();
    const {
        saveVideoFileEdits,
        isScanning,
        selectedVideo,
        alert,
        hideAlert,
        isAuth,
        logout,
        checkAuth,
        loadFilterOptions
    } = props;

    useEffect(() => {
        const doCheckAuth = async () => {
            await checkAuth();
            setStarted(true);
        };
        doCheckAuth();
    }, []);

    useEffect(() => {
        const startup = async () => {
            if (isAuth) {
                loadFilterOptions();
                await dispatch(checkIsScanning());
            }
        };
        startup();
    }, [isAuth]);

    const saveFileChanges = async () => {
        await saveVideoFileEdits();
        history.push('/');
    };

    return (
        <div className={ classes.AppContent }>
            <VideoNavbar
                disabled={ isScanning || !isAuth }
                logout={ logout }
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
                        selectedVideo={ selectedVideo }
                        isScanning={ isScanning }
                        isAuth={ isAuth }
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
    showErrorAlert: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    loadFilterOptions: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    hideAlert: PropTypes.func,
    saveVideoFileEdits: PropTypes.func,
    checkAuth: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    isAuth: PropTypes.bool,
    logout: PropTypes.func
};

const mapStateToProps = (state) => ({
    isScanning: state.scanning.isScanning,
    alert: state.alert,
    selectedVideo: getSelectedVideoWithFilters(state),
    isAuth: state.auth.isAuth
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    showErrorAlert,
    loadFilterOptions,
    hideAlert,
    saveVideoFileEdits,
    checkAuth,
    logout
}, dispatch);

const AppContentWrapped = connect(mapStateToProps, mapDispatchToProps)(AppContent);
AppContentWrapped.propTypes = {};
export default AppContentWrapped;