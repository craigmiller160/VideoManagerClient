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
import UserDetailsPage from './UserDetailsPage';
import * as AuthApiService from '../../../../services/AuthApiService';
import { formatRoles, unFormatRoles } from './userUtils';
import { handleApiError, showSuccessAlert } from '../../../../store/alert/alert.actions';
import { useDispatch } from 'react-redux';

const AddUser = (props) => {
    const { history } = props;
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    const [allRoles, setAllRoles] = useState([]);

    useEffect(() => {
        const setup = async () => {
            try {
                const res = await AuthApiService.getRoles();
                setAllRoles(formatRoles(res.data));
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

        try {
            const res = await AuthApiService.createUser(payload);
            const userId = res.data.userId;
            history.push(`/users/${userId}`);
            dispatch(showSuccessAlert('Successfully created user'));
        } catch (ex) {
            dispatch(handleApiError(ex));
        }
    };

    return (
        <UserDetailsPage
            pageTitle="Add User"
            roles={ allRoles }
            userDetails={ {} }
            loading={ isLoading }
            saveUser={ save }
            enableUsername
            requirePassword
        />
    );
};
AddUser.propTypes = {
    history: PropTypes.object
};

export default AddUser;
