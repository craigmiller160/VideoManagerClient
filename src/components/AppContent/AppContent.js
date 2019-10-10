import React, { useEffect, useState } from 'react';
import VideoNavbar from 'components/AppContent/VideoNavbar/VideoNavbar';
import { Col, Container, Row } from 'reactstrap';
import Alert from '../UI/Alert/Alert';
import { checkIsScanning } from 'store/scanning/scanning.actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { getSelectedVideoWithFilters } from 'store/videoList/videoList.selectors';
import classes from './AppContent.scss';
import { loadFilterOptions } from 'store/videoSearch/videoSearch.actions';
import { saveVideoFileEdits } from 'store/videoList/videoList.actions';
import AppRoutes from './AppRoutes';
import { checkAuth, logout } from '../../store/auth/auth.actions';
import { hideAlert } from '../../store/alert/alert.actions';

const AppContent = () => {
    const [ isStarted, setStarted ] = useState(false);
    const { history } = useReactRouter();
    const dispatch = useDispatch();
    const isScanning = useSelector((state) => state.scanning.isScanning, shallowEqual);
    const alert = useSelector((state) => state.alert, shallowEqual);
    const selectedVideo = useSelector(getSelectedVideoWithFilters, shallowEqual);
    const isAuth = useSelector((state) => state.auth.isAuth, shallowEqual);

    useEffect(() => {
        const doCheckAuth = async () => {
            await dispatch(checkAuth());
            setStarted(true);
        };
        doCheckAuth();
    }, []);

    useEffect(() => {
        const startup = async () => {
            if (isAuth) {
                dispatch(loadFilterOptions());
                await dispatch(checkIsScanning());
            }
        };
        startup();
    }, [isAuth]);

    const saveFileChanges = async () => {
        await dispatch(saveVideoFileEdits());
        history.push('/list');
    };

    const hideAlertOnClick = () => dispatch(hideAlert());

    return (
        <div className={ classes.AppContent } onClick={ hideAlertOnClick }>
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

export default AppContent;