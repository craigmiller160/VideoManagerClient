import React, { useState, useEffect } from 'react';
import * as AuthApiService from 'services/AuthApiService';
import classes from './UserManagementPage.scss';
import FlexRow from '../../../UI/Grid/FlexRow';

const UserManagementPage = () => {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const res = await AuthApiService.getAllUsers();
            setAllUsers(res.data);
        };
        loadUsers();
    }, []);

    return (
        <div className={ classes.UserManagementPage }>
            <FlexRow>
                <div className={ classes.title }>
                    <h3>User Management</h3>
                </div>
            </FlexRow>
            <FlexRow>
                {
                    allUsers?.map((user) => user.userName)
                }
            </FlexRow>
        </div>
    );
};

export default UserManagementPage;
