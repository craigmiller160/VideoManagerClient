import React from 'react';
import PropTypes from 'prop-types';
import classes from './UserListItem.scss';

const UserListItem = (props) => {
    const {
        user
    } = props;

    return (
        <div className={ classes.UserListItem }>
            <p>{ user.userName }</p>
        </div>
    );
};
UserListItem.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserListItem;
