import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import Scanning from './Scanning/Scanning';
import VideoFileEdit from './VideoFileEdit/VideoFileEdit';
import ManageVideoFilters from './ManageVideoFilters/ManageVideoFilters';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import VideoListLayout from './VideoListLayout/VideoListLayout';
import Login from './Login/Login';
import ProtectedRoute from '../Routing/ProtectedRoute';

const AppRoutes = (props) => {
    const {
        checkIsScanning,
        selectedVideo,
        saveFileChanges,
        isScanning,
        isAuth
    } = props;

    return (
        <Switch>
            <ProtectedRoute
                path="/scanning"
                component={ Scanning }
                componentProps={ {
                    checkIsScanning
                } }
                rules={ [
                    { allow: () => isAuth, redirect: '/login' },
                    { allow: () => isScanning, redirect: '/' }
                ] }
            />
            <ProtectedRoute
                path="/edit"
                component={ VideoFileEdit }
                componentProps={ {
                    selectedVideo,
                    saveFileChanges
                } }
                rules={ [
                    { allow: () => isAuth, redirect: '/login' },
                    { allow: () => !isScanning, redirect: '/scanning' },
                    { allow: () => !!selectedVideo?.fileName, redirect: '/' }
                ] }
            />
            <ProtectedRoute
                path="/filters"
                component={ ManageVideoFilters }
                rules={ [
                    { allow: () => isAuth, redirect: '/login' },
                    { allow: () => !isScanning, redirect: '/scanning' }
                ] }
            />
            <ProtectedRoute
                path="/play/:fileId"
                component={ VideoPlayer }
                rules={ [
                    { allow: () => isAuth, redirect: '/login' },
                    { allow: () => !isScanning, redirect: '/scanning' }
                ] }
            />
            <ProtectedRoute
                path="/list"
                component={ VideoListLayout }
                rules={ [
                    { allow: () => isAuth, redirect: '/login' },
                    { allow: () => !isScanning, redirect: '/scanning' }
                ] }
            />
            <ProtectedRoute
                path="/login"
                exact
                component={ Login }
                rules={ [
                    { allow: () => !isAuth, redirect: '/' }
                ] }
            />
        </Switch>
    );
};
AppRoutes.propTypes = {
    checkIsScanning: PropTypes.func,
    selectedVideo: PropTypes.object,
    saveFileChanges: PropTypes.func,
    isScanning: PropTypes.bool,
    isAuth: PropTypes.bool
};

export default AppRoutes;