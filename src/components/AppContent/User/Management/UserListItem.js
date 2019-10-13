import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classes from './UserListItem.scss';
import FlexRow from '../../../UI/Grid/FlexRow';

const UserListItem = (props) => {
    const {
        user
    } = props;

    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <FlexRow
            justifyContent="space-around"
            className={ classes.UserListItem }
        >
            <p>{ user.userName }</p>
            <p>{ fullName }</p>
            <p>
                {
                    user.roles.map((role) => (
                        <Fragment key={ role.roleId }>
                            <span key={ role.roleId }>{ role.name }</span>
                            <br />
                        </Fragment>
                    ))
                }
            </p>
        </FlexRow>
    );
};
UserListItem.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserListItem;
