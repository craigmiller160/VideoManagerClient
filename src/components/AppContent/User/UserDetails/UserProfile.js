import React from 'react';
import UserDetailsPage from './UserDetailsPage';
import { shallowEqual, useSelector } from 'react-redux';
import * as AuthApiService from '../../../../services/AuthApiService';
import { formatRoles, formatUser } from './userUtils';
import { hasAdminRole as hasAdminRoleSelector } from '../../../../store/auth/auth.selectors';

const UserProfile = () => {
    const authUserDetails = useSelector(state => state.auth.userDetails, shallowEqual);
    const hasAdminRole = useSelector(hasAdminRoleSelector);

    const setup = async () => {
        let roles = [];
        if (hasAdminRole) {
            const res = await AuthApiService.getRoles();
            roles = res.data;
        }

        return {
            roles: formatRoles(roles),
            userDetails: formatUser(authUserDetails)
        };
    };

    return (
        <UserDetailsPage
            pageTitle="User Profile"
            setup={ setup }
            enableRoles={ hasAdminRole }
        />
    );
};

export default UserProfile;
