import React, { useState, useEffect } from 'react';
import * as AuthApiService from 'services/AuthApiService';
import classes from './UserManagementPage.scss';
import FlexRow from '../../../UI/Grid/FlexRow';
import UserListItem from './UserListItem';
import FlexCol from '../../../UI/Grid/FlexCol';

const userNameSort = (user1, user2) => {
    if (user1.userName < user2.userName) {
        return -1;
    }

    if (user1.userName > user2.userName) {
        return 1;
    }

    return 0;
};

const UserManagementPage = () => {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const res = await AuthApiService.getAllUsers();
            setAllUsers(res.data ?? []);
        };
        loadUsers();
    }, []);

    const displayUsers = allUsers.sort(userNameSort);

    return (
        <div className={ classes.UserManagementPage }>
            <FlexRow>
                <div className={ classes.title }>
                    <h3>User Management</h3>
                </div>
            </FlexRow>
            <FlexCol>
                {
                    displayUsers.map((user) => (
                        <UserListItem
                            user={ user }
                            key={ user.userId }
                        />
                    ))
                }
            </FlexCol>
        </div>
    );
};

export default UserManagementPage;
