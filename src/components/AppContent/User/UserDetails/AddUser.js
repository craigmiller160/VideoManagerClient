/* eslint-disable */ // TODO delete this
import React, { useState, useEffect } from 'react';
import UserDetailsPage from './UserDetailsPage';
import * as AuthApiService from '../../../../services/AuthApiService';

const AddUser = () => {
    const [isLoading, setLoading] = useState(true);
    const [allRoles, setAllRoles] = useState([]);

    useEffect(() => {
        const setup = async () => {
            const res = await AuthApiService.getRoles();
            setAllRoles(res.data);
            setLoading(false);
        };

        setup();
    }, []);

    const save = () => {
        throw new Error('Finish this');
    };

    // TODO need to add field validation for UserDetailsPage and its form.
    // TODO username, firstname, lastname fields should always be required
    // TODO password should be required for AddUser

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

export default AddUser;