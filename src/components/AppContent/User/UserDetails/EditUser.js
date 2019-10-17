import React from 'react';
import UserDetailsPage from './UserDetailsPage';
import * as AuthApiService from '../../../../services/AuthApiService';
import { formatRoles, formatUser } from './userUtils';

const EditUser = (props) => {
    const {
        match
    } = props;

    const setup = async () => {
        const resArray = await Promise.all([
            AuthApiService.getRoles(),
            AuthApiService.getUser(match.params.userId)
        ]);
        return {
            roles: formatRoles(resArray[0].data),
            userDetails: formatUser(resArray[1].data)
        };
    };

    return (
        <UserDetailsPage
            pageTitle="Edit User"
        />
    );
};

export default EditUser;
