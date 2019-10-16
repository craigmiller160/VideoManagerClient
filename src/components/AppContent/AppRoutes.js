import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import Scanning from './Scanning/Scanning';
import VideoFileEdit from './VideoFileEdit/VideoFileEdit';
import ManageVideoFilters from './ManageVideoFilters/ManageVideoFilters';
import VideoPlayerPage from './VideoPlayer/VideoPlayerPage';
import VideoListLayout from './VideoListLayout/VideoListLayout';
import Login from './Login/Login';
import ProtectedRoute from '../Routing/ProtectedRoute';
import Home from './Home/Home';
import { useSelector } from 'react-redux';
import {
    hasAdminRole as hasAdminRoleSelector,
    hasEditRole as hasEditRoleSelector
} from '../../store/auth/auth.selectors';
import UserManagementPage from './User/Management/UserManagementPage';
import UserProfile from './User/UserDetails/UserProfile';
import EditUser from './User/UserDetails/EditUser';

const AppRoutes = (props) => {
    const hasEditRole = useSelector(hasEditRoleSelector);
    const hasAdminRole = useSelector(hasAdminRoleSelector);
    const {
        selectedVideo,
        saveFileChanges,
        isScanning,
        isAuth
    } = props;

    const hasEditRoleRule = {
        allow: () => hasEditRole, redirect: '/'
    };

    const hasAdminRoleRule = {
        allow: () => hasAdminRole, redirect: '/'
    };

    const isAuthenticatedRule = {
        allow: () => isAuth, redirect: '/login'
    };

    const isNotAuthenticatedRule = {
        allow: () => !isAuth, redirect: '/'
    };

    const isScanningRule = {
        allow: () => isScanning, redirect: '/'
    };

    const isNotScanningRule = {
        allow: () => !isScanning, redirect: '/scanning'
    };

    const hasSelectedVideoRule = {
        allow: () => !!selectedVideo?.fileName, redirect: '/'
    };

    return (
        <Switch>
            <ProtectedRoute
                path="/scanning"
                component={ Scanning }
                rules={ [
                    isAuthenticatedRule,
                    isScanningRule
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
                    isAuthenticatedRule,
                    isNotScanningRule,
                    hasSelectedVideoRule,
                    hasEditRoleRule
                ] }
            />
            <ProtectedRoute
                path="/filters"
                component={ ManageVideoFilters }
                rules={ [
                    isAuthenticatedRule,
                    isNotScanningRule,
                    hasEditRoleRule
                ] }
            />
            <ProtectedRoute
                path="/play/:fileId"
                component={ VideoPlayerPage }
                rules={ [
                    isAuthenticatedRule,
                    isNotScanningRule
                ] }
            />
            <ProtectedRoute
                path="/videos"
                component={ VideoListLayout }
                rules={ [
                    isAuthenticatedRule,
                    isNotScanningRule
                ] }
            />
            <ProtectedRoute
                routeKey="/profile"
                path="/profile"
                component={ UserProfile }
                rules={ [
                    isAuthenticatedRule,
                    isNotScanningRule
                ] }
            />
            <ProtectedRoute
                routeKey="/users/userId"
                path="/users/:userId"
                component={ EditUser }
                rules={ [
                    isAuthenticatedRule,
                    hasAdminRoleRule,
                    isNotScanningRule
                ] }
            />
            <ProtectedRoute
                path="/users"
                component={ UserManagementPage }
                rules={ [
                    isAuthenticatedRule,
                    isNotScanningRule,
                    hasAdminRoleRule
                ] }
            />
            <ProtectedRoute
                path="/login"
                exact
                component={ Login }
                rules={ [
                    isNotAuthenticatedRule
                ] }
            />
            <ProtectedRoute
                path="/"
                exact
                component={ Home }
                rules={ [
                    isAuthenticatedRule
                ] }
            />
        </Switch>
    );
};
AppRoutes.propTypes = {
    selectedVideo: PropTypes.object,
    saveFileChanges: PropTypes.func,
    isScanning: PropTypes.bool,
    isAuth: PropTypes.bool
};

export default AppRoutes;
