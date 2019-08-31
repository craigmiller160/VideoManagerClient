import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
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
            <Route
                path="/edit"
                render={ (routeProps) => (
                    <VideoFileEdit
                        { ...routeProps }
                        selectedVideo={ selectedVideo }
                        saveFileChanges={ saveFileChanges }
                    />
                ) }
            />
            <Route
                path="/filters"
                render={ (routeProps) => (
                    <ManageVideoFilters
                        { ...routeProps }
                    />
                ) }
            />
            <Route
                path="/play/:fileId"
                render={ (routeProps) => (
                    <VideoPlayer { ...routeProps } />
                ) }
            />
            <Route
                path="/list"
                render={ (routeProps) => (
                    <VideoListLayout
                        { ...routeProps }
                    />
                ) }
            />
            <Route
                path="/login"
                exact
                render={ (routeProps) => (
                    <Login { ...routeProps } />
                ) }
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