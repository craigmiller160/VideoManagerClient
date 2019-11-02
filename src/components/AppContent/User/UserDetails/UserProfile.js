import React, { useEffect, useState } from 'react';
import UserDetailsPage from './UserDetailsPage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as AuthApiService from '../../../../services/AuthApiService';
import { formatRoles, formatUser } from './userUtils';
import { hasAdminRole as hasAdminRoleSelector } from '../../../../store/auth/auth.selectors';
import { saveUserProfile } from '../../../../store/auth/auth.actions';
import { showErrorAlert } from '../../../../store/alert/alert.actions';

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
                    console.log('Ex: ' + ex.message); // TODO delete this
                    dispatch(showErrorAlert(`Error loading roles: ${ex.message}`));
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
