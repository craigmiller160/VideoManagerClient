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

import React from 'react';
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import classes from './NavbarDropdown.scss';
import NavbarItem from './NavbarItem';
import { logout } from '../../../store/auth/auth.actions';

// TODO delete this, it's unnecessary

const NavbarDropdown = () => {
    const dispatch = useDispatch();
    const { location } = useReactRouter();
    const { firstName, lastName } = useSelector(state => state.auth.userDetails, shallowEqual);

    const toggleClasses = [];
    if (location.pathname === '/profile') {
        toggleClasses.push('active');
    }

    const fullName = `${firstName} ${lastName}`;

    return (
        <UncontrolledDropdown nav inNavbar className={ classes.NavbarDropdown }>
            <DropdownToggle id="vm-navbar-dropdown-toggle" nav caret className={ toggleClasses.join(' ') }>{ fullName }</DropdownToggle>
            <DropdownMenu id="vm-navbar-dropdown" right className={ classes.dropdown }>
                <NavbarItem
                    id="userProfileLink"
                    text="Profile"
                    className={ classes.dropdownItem }
                    isLink
                    exact
                    to="/profile"
                />
                <NavbarItem
                    id="logoutLink"
                    onClick={ () => dispatch(logout()) }
                    className={ classes.dropdownItem }
                    text="Logout"
                />
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default NavbarDropdown;
