/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router-dom';
import Scanning from './Scanning/Scanning';
import VideoFileEdit from './VideoFileEdit/VideoFileEdit';
import ManageVideoFilters from './ManageVideoFilters/ManageVideoFilters';
import VideoPlayerPage from './VideoPlayer/VideoPlayerPage';
import VideoListLayout from './VideoListLayout/VideoListLayout';
import ProtectedRoute from '@craigmiller160/react-protected-route';
import Home from './Home/Home';
import { useSelector } from 'react-redux';
import {
    hasAdminRole as hasAdminRoleSelector,
    hasEditRole as hasEditRoleSelector
} from '../../store/auth/auth.selectors';
import Settings from './Settings';

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
        allow: ({ editRole }) => editRole,
        redirect: '/'
    };

    const hasAdminRoleRule = {
        allow: ({ adminRole }) => adminRole,
        redirect: '/'
    };

    const isAuthenticatedRule = {
        allow: ({ auth }) => auth,
        redirect: '/login'
    };

    // const isNotAuthenticatedRule = {
    //     allow: ({ auth }) => !auth,
    //     redirect: '/'
    // };

    const isScanningRule = {
        allow: ({ scanning }) => scanning,
        redirect: '/'
    };

    const isNotScanningRule = {
        allow: ({ scanning }) => !scanning,
        redirect: '/scanning'
    };

    const hasSelectedVideoRule = {
        allow: ({ selected }) => !!selected?.fileName,
        redirect: '/'
    };

    const ruleProps = {
        selected: selectedVideo,
        adminRole: hasAdminRole,
        editRole: hasEditRole,
        auth: isAuth,
        scanning: isScanning
    };

    return (
        <Switch>
            <ProtectedRoute
                path="/scanning"
                component={ Scanning }
                ruleProps={ ruleProps }
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
                ruleProps={ ruleProps }
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
                ruleProps={ ruleProps }
                rules={ [
                    isAuthenticatedRule,
                    isNotScanningRule,
                    hasEditRoleRule
                ] }
            />
            <ProtectedRoute
                path="/play/:fileId"
                component={ VideoPlayerPage }
                ruleProps={ ruleProps }
                rules={ [
                    isAuthenticatedRule,
                    isNotScanningRule
                ] }
            />
            <ProtectedRoute
                path="/videos"
                component={ VideoListLayout }
                ruleProps={ ruleProps }
                rules={ [
                    isAuthenticatedRule,
                    isNotScanningRule
                ] }
            />
            <ProtectedRoute
                component={ Settings }
                ruleProps={ ruleProps }
                path="/settings"
                rules={ [
                    isAuthenticatedRule,
                    hasAdminRoleRule
                ] }
            />
            <ProtectedRoute
                path="/"
                exact
                component={ Home }
                ruleProps={ ruleProps }
            />
            <Redirect to="/" />
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
