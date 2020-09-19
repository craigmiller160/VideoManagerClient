/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as AuthApiService from 'services/AuthApiService';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import classes from './UserManagementPage.scss';
import FlexRow from '../../../UI/Grid/FlexRow';
import UserListItem from './UserListItem';
import FlexCol from '../../../UI/Grid/FlexCol';
import { handleApiError } from '../../../../store/alert/alert.actions';
import Spinner from '../../../UI/Spinner/Spinner';

const userNameSort = (user1, user2) => {
    if (user1.userName < user2.userName) {
        return -1;
    }

    if (user1.userName > user2.userName) {
        return 1;
    }

    return 0;
};

const UserManagementPage = (props) => {
    const { history } = props;
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const res = await AuthApiService.getAllUsers();
                const users = res.data || [];
                const displayUsers = [...users];
                displayUsers.sort(userNameSort);
                setAllUsers(displayUsers);
            } catch(ex) {
                dispatch(handleApiError(ex, 'Failed to load users.'));
            }
            setLoading(false);
        };
        loadUsers();
    }, []);

    const changeExpanded = (userId) => {
        const newUsers = allUsers.map((user) => ({
            ...user,
            expanded: user.userId === userId
        }));
        setAllUsers(newUsers);
    };

    return (
        <div className={ classes.UserManagementPage }>
            <FlexRow>
                <div className={ classes.title }>
                    <h3>User Management</h3>
                </div>
            </FlexRow>
            {
                loading &&
                <Spinner id="user-details-spinner" />
            }
            {
                !loading &&
                <>
                    <FlexCol className={ classes.list }>
                        {
                            allUsers.map((user) => (
                                <UserListItem
                                    user={ user }
                                    key={ user.userId }
                                    changeExpanded={ changeExpanded }
                                />
                            ))
                        }
                    </FlexCol>
                    <FlexRow className="mt-4" justifyContent="flex-end">
                        <Button
                            id="add-user-btn"
                            type="button"
                            color="primary"
                            onClick={ () => history.push('/users/new') }
                        >
                            Add User
                        </Button>
                    </FlexRow>
                </>
            }
        </div>
    );
};
UserManagementPage.propTypes = {
    history: PropTypes.object
};

export default UserManagementPage;
