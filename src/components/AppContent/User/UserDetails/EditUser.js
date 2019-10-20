/* eslint-disable */ // TODO delete this
import React, { useEffect, useState } from 'react';
import UserDetailsPage from './UserDetailsPage';
import * as AuthApiService from '../../../../services/AuthApiService';
import { formatRoles, formatUser, unFormatRoles } from './userUtils';
import { showErrorAlert, showSuccessAlert } from '../../../../store/alert/alert.actions';
import { useDispatch } from 'react-redux';

const EditUser = (props) => {
    const dispatch = useDispatch();
    const {
        match
    } = props;

    const [isLoading, setLoading] = useState(true);
    const [allRoles, setAllRoles] = useState([]);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const setup = async () => {
            const resArray = await Promise.all([
                AuthApiService.getRoles(),
                AuthApiService.getUser(match.params.userId)
            ]);

            setAllRoles(formatRoles(resArray[0].data));
            setUserDetails(formatUser(resArray[1].data));
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
            dispatch(showSuccessAlert('Successfully saved user'));
        } catch (ex) {
            dispatch(showErrorAlert(ex.message));
        }
        setLoading(false);
    };

    const deleteUser = () => {
        throw new Error('Finish this');
    };

    const revokeUser = async () => {
        setLoading(true);
        try {
            const res = await AuthApiService.revokeAccess(match.params.userId);
            setUserDetails(formatUser(res.data));
            dispatch(showSuccessAlert('Successfully revoked user access'));
        } catch (ex) {
            dispatch(showErrorAlert(ex.message));
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

export default EditUser;
