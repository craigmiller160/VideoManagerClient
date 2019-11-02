import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as AuthApiService from 'services/AuthApiService';
import classes from './UserManagementPage.scss';
import FlexRow from '../../../UI/Grid/FlexRow';
import UserListItem from './UserListItem';
import FlexCol from '../../../UI/Grid/FlexCol';
import { Button } from 'reactstrap';

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

    useEffect(() => {
        console.log('Running effect'); // TODO delete this
        const loadUsers = async () => {
            console.log('In async'); // TODO delete this
            try {
                const res = await AuthApiService.getAllUsers();
                console.log('After API'); // TODO delete this
                setAllUsers(res.data ?? []);
                console.log('Set state'); // TODO delete this
            } catch(ex) {
                // TODO include some actual error handling
                console.log(ex); // TODO delete this
            }

        };
        loadUsers();
    }, []);

    const displayUsers = allUsers.sort(userNameSort);

    const changeExpanded = (userId) => {
        const newUsers = allUsers.map((user) => ({
            ...user,
            expanded: user.userId === userId
        }));
        setAllUsers(newUsers);
    };

    console.log(displayUsers); // TODO delete this

    return (
        <div className={ classes.UserManagementPage }>
            <FlexRow>
                <div className={ classes.title }>
                    <h3>User Management</h3>
                </div>
            </FlexRow>
            <FlexCol className={ classes.list }>
                {
                    displayUsers.map((user) => (
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
                    type="button"
                    color="primary"
                    onClick={ () => history.push('/users/new') }
                >
                    Add User
                </Button>
            </FlexRow>
        </div>
    );
};
UserManagementPage.propTypes = {
    history: PropTypes.object
};

export default UserManagementPage;
