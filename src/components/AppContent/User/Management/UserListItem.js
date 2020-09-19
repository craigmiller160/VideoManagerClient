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

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './UserListItem.scss';
import FlexRow from '../../../UI/Grid/FlexRow';
import { Button } from 'reactstrap';
import AnimateHeight from 'react-animate-height';

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

    const animateHeight = user.expanded ? 'auto' : 0;

    return (
        <div
            data-name="user-list-item-root"
            className={ listItemClasses.join(' ') }
            onClick={ onItemClick }
        >
            <FlexRow justifyContent="space-around">
                <p data-name="user-item-user-name">{ user.userName }</p>
                <p data-name="user-item-full-name">{ fullName }</p>
                <p data-name="user-item-roles">
                    {
                        user.roles.map((role) => (
                            <Fragment key={ role.roleId }>
                                <span data-name={ `role_${role.roleId}` } key={ role.roleId }>{ role.name }</span>
                                <br />
                            </Fragment>
                        ))
                    }
                </p>
            </FlexRow>
            <AnimateHeight
                duration={ 500 }
                height={ animateHeight }
            >
                <FlexRow className="mt-4" justifyContent="flex-end">
                    <Link to={ `/users/${user.userId}` }>
                        <Button data-name="user-item-edit-btn" color="info">Edit</Button>
                    </Link>
                </FlexRow>
            </AnimateHeight>
        </div>

    );
};
UserListItem.propTypes = {
    user: PropTypes.object.isRequired,
    changeExpanded: PropTypes.func.isRequired
};

export default UserListItem;
