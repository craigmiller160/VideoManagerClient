import React from 'react';
import classes from './UserManagementPage.scss';
import FlexRow from '../../../UI/Grid/FlexRow';

const UserManagementPage = () => {
    return (
        <div className={ classes.UserManagementPage }>
            <FlexRow>
                <div className={ classes.title }>
                    <h3>User Management</h3>
                </div>
            </FlexRow>
        </div>
    );
};

export default UserManagementPage;
