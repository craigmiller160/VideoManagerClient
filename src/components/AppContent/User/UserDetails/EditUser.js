/* eslint-disable */ // TODO delete this
import React, { useEffect, useState } from 'react';
import UserDetailsPage from './UserDetailsPage';
import * as AuthApiService from '../../../../services/AuthApiService';
import { formatRoles, formatUser } from './userUtils';

const EditUser = (props) => {
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

    const save = () => {
        throw new Error('Finish this');
    };

    const deleteUser = () => {
        throw new Error('Finish this');
    };

    const revokeUser = () => {
        throw new Error('Finish this');
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
