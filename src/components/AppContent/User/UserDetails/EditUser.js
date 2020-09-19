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
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import UserDetailsPage from './UserDetailsPage';
import * as AuthApiService from '../../../../services/AuthApiService';
import { formatRoles, formatUser, unFormatRoles } from './userUtils';
import { handleApiError, showSuccessAlert } from '../../../../store/alert/alert.actions';
import { checkAuth } from '../../../../store/auth/auth.actions';

const EditUser = (props) => {
    const dispatch = useDispatch();
    const {
        match,
        history
    } = props;

    const [isLoading, setLoading] = useState(true);
    const [allRoles, setAllRoles] = useState([]);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const setup = async () => {
            try {
                const resArray = await Promise.all([
                    AuthApiService.getRoles(),
                    AuthApiService.getUser(match.params.userId)
                ]);

                setAllRoles(formatRoles(resArray[0].data));
                setUserDetails(formatUser(resArray[1].data));
            } catch (ex) {
                dispatch(handleApiError(ex, 'Error loading data for page.'));
            }
            setLoading(false);
        };
        setup();
    }, []);

    const save = async (values) => {
        setLoading(true);
        const payload = {
            ...values,
            roles: unFormatRoles(values.roles)
        };
        delete payload.lastAuthenticated;

        try {
            const res = await AuthApiService.saveUserAdmin(match.params.userId, payload);
            setUserDetails(formatUser(res.data));
            dispatch(checkAuth());
            dispatch(showSuccessAlert('Successfully saved user'));
            history.push('/users');
        } catch (ex) {
            dispatch(handleApiError(ex, 'Error saving user.'));
        }
        setLoading(false);
    };

    const deleteUser = async () => {
        setLoading(true);
        try {
            await AuthApiService.deleteUser(match.params.userId);
            dispatch(showSuccessAlert('Successfully deleted user'));
            history.push('/users');
        } catch (ex) {
            dispatch(handleApiError(ex, 'Error deleting user.'));
        }
        setLoading(false);
    };

    const revokeUser = async () => {
        setLoading(true);
        try {
            const res = await AuthApiService.revokeAccess(match.params.userId);
            setUserDetails(formatUser(res.data));
            dispatch(showSuccessAlert('Successfully revoked user login'));
        } catch (ex) {
            dispatch(handleApiError(ex, 'Error revoking user login'));
        }
        setLoading(false);
    };

    return (
        <UserDetailsPage
            pageTitle="Edit User"
            roles={ allRoles }
            userDetails={ userDetails }
            loading={ isLoading }
            saveUser={ save }
            deleteUser={ deleteUser }
            revokeUser={ revokeUser }
        />
    );
};
EditUser.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object
    }),
    history: PropTypes.shape({
        push: PropTypes.func
    })
};

export default EditUser;
