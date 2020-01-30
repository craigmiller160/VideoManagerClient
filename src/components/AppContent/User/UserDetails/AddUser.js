import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserDetailsPage from './UserDetailsPage';
import * as AuthApiService from '../../../../services/AuthApiService';
import { formatRoles, unFormatRoles } from './userUtils';
import { handleApiError, showErrorAlert, showSuccessAlert } from '../../../../store/alert/alert.actions';
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
