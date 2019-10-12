import React from 'react';
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import classes from './NavbarDropdown.scss';
import NavbarItem from './NavbarItem';
import { logout } from '../../../store/auth/auth.actions';

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
            <DropdownToggle nav caret className={ toggleClasses.join(' ') }>{ fullName }</DropdownToggle>
            <DropdownMenu right className={ classes.dropdown }>
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