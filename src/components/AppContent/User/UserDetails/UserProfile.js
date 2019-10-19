/* eslint-disable */ // TODO delete this
import React, { useEffect, useState } from 'react';
import UserDetailsPage from './UserDetailsPage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as AuthApiService from '../../../../services/AuthApiService';
import { formatRoles, formatUser } from './userUtils';
import { hasAdminRole as hasAdminRoleSelector } from '../../../../store/auth/auth.selectors';
import { saveUserProfile } from '../../../../store/auth/auth.actions';

const UserProfile = () => {
    const dispatch = useDispatch();
    const authUserDetails = useSelector(state => state.auth.userDetails, shallowEqual);
    const hasAdminRole = useSelector(hasAdminRoleSelector);
    const [isLoading, setLoading] = useState(true);
    const [allRoles, setAllRoles] = useState([]);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const setup = async () => {
            let roles = [];
            if (hasAdminRole) {
                const res = await AuthApiService.getRoles();
                roles = res.data;
            }

            setAllRoles(formatRoles(roles));
            setUserDetails(formatUser(authUserDetails));
            setLoading(false);
        };
        setup();
    }, []);

    const save = (values) => dispatch(saveUserProfile(values));

    return (
        <UserDetailsPage
            pageTitle="User Profile"
            enableRoles={ hasAdminRole }
            loading={ isLoading }
            userDetails={ userDetails }
            roles={ allRoles }
            saveUser={ save }
        />
    );
};

export default UserProfile;
