/* eslint-disable */ // TODO delete this
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classes from './UserListItem.scss';
import FlexRow from '../../../UI/Grid/FlexRow';
import { Button } from 'reactstrap';

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

    const listItemClasses = [classes.UserListItem];
    if (user.expanded) {
        listItemClasses.push(classes.active);
    }

    return (
        <div className={ listItemClasses.join(' ') } onClick={ onItemClick }>
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
                <FlexRow className="mt-4" justifyContent="flex-end">
                    <Button color="info">Edit</Button>
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
