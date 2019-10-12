import React from 'react';
import PropTypes from 'prop-types';

const UserListItem = (props) => {
    const {
        user
    } = props;

    return (
        <div>{ user.userName }</div>
    );
};
UserListItem.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserListItem;
