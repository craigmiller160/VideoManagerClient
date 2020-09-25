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

import React, { useState } from 'react';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import * as classes from './VideoNavbar.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { startFileScan } from '../../../store/scanning/scanning.actions';
import NavbarItem from './NavbarItem';
import {
    hasAdminRole as hasAdminRoleSelector,
    hasEditRole as hasEditRoleSelector,
    hasScanRole as hasScanRoleSelector
} from '../../../store/auth/auth.selectors';

const VideoNavbar = (props) => {
    const dispatch = useDispatch();
    const { history } = useReactRouter();
    const [ isOpen, setOpen ] = useState(false);
    const hasEditRole = useSelector(hasEditRoleSelector);
    const hasScanRole = useSelector(hasScanRoleSelector);
    const hasAdminRole = useSelector(hasAdminRoleSelector);
    const isAuth = useSelector((state) => state.auth.isAuth);

    const onScanDirClick = async () => {
        await dispatch(startFileScan());
        history.push('/scanning');
    };

    const authLinkText = isAuth ? 'Logout' : 'Login';

    return (
        <Navbar className={ classes.VideoNavbar } color="dark" dark expand="md">
            <Container>
                <NavbarBrand
                    tag="div"
                >
                    <NavLink
                        id="home-link"
                        to="/"
                        activeClassName={ classes.active }
                        className={ classes.link }
                    >
                        Video Manager
                    </NavLink>
                </NavbarBrand>
                <NavbarToggler onClick={ () => setOpen(!isOpen) } />
                <Collapse isOpen={ isOpen } navbar>
                    <Nav navbar>
                        {
                            isAuth &&
                            <NavbarItem
                                id="videoListLink"
                                to="/videos"
                                exact
                                text="Videos"
                                isLink
                            />
                        }
                        {
                            hasEditRole &&
                            <NavbarItem
                                id="manageFiltersLink"
                                to="/filters"
                                exact
                                text="Filters"
                                isLink
                            />
                        }
                        {
                            hasAdminRole &&
                            <NavbarItem
                                id="userManagementLink"
                                to="/users"
                                text="Users"
                                isLink
                            />
                        }
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        {
                            hasScanRole &&
                            <NavbarItem
                                id="scanDirectoryLink"
                                onClick={ onScanDirClick }
                                text="Scan"
                            />
                        }
                        {
                            hasAdminRole &&
                            <NavbarItem
                                id="settingsLink"
                                to="/settings"
                                text="Settings"
                                isLink
                            />
                        }
                        <NavbarItem
                            id="authLink"
                            text={ authLinkText }
                        />
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

export default VideoNavbar;
