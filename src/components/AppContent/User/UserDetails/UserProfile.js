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

import React, { useEffect, useState } from 'react';
import UserDetailsPage from './UserDetailsPage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as AuthApiService from '../../../../services/AuthApiService';
import { formatRoles, formatUser } from './userUtils';
import { hasAdminRole as hasAdminRoleSelector } from '../../../../store/auth/auth.selectors';
import { saveUserProfile } from '../../../../store/auth/auth.actions';
import { handleApiError } from '../../../../store/alert/alert.actions';

const UserProfile = () => {
    const dispatch = useDispatch();
    const authUserDetails = useSelector(state => state.auth.userDetails, shallowEqual);
    const hasAdminRole = useSelector(hasAdminRoleSelector);
    const [isLoading, setLoading] = useState(true);
    const [allRoles, setAllRoles] = useState([]);

    useEffect(() => {
        const setup = async () => {
            let roles = [];
            if (hasAdminRole) {
                try {
                    const res = await AuthApiService.getRoles();
                    roles = res.data;
                } catch (ex) {
                    dispatch(handleApiError(ex, 'Error loading roles'));
                }
            }

            setAllRoles(formatRoles(roles));
            setLoading(false);
        };
        setup();
    }, []);

    const save = async (values) => {
        setLoading(true);
        await dispatch(saveUserProfile(values));
        setLoading(false);
    };

    return (
        <UserDetailsPage
            pageTitle="User Profile"
            enableRoles={ hasAdminRole }
            loading={ isLoading }
            userDetails={ formatUser(authUserDetails) }
            roles={ allRoles }
            saveUser={ save }
        />
    );
};

export default UserProfile;
