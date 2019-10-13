/* eslint-disable */ // TODO delete this
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classes from './UserListItem.scss';
import FlexRow from '../../../UI/Grid/FlexRow';

const UserListItem = (props) => {
    const {
        user,
        changeExpanded
    } = props;

    const fullName = `${user.firstName} ${user.lastName}`;

    const onItemClick = () => {
        if (!user.expanded) {
            changeExpanded(user.userId);
        }
    };

    return (
        <div className={ classes.UserListItem } onClick={ onItemClick }>
            <FlexRow justifyContent="space-around">
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
            {
                user.expanded &&
                <FlexRow justifyContent="flex-end">
                    <p>Working</p>
                </FlexRow>
            }
        </div>

    );
};
UserListItem.propTypes = {
    user: PropTypes.object.isRequired,
    changeExpanded: PropTypes.func.isRequired
};

export default UserListItem;
