/* eslint-disable */ // TODO delete this
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Collapse, Container, Nav, Navbar,
    NavbarBrand, NavbarToggler, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import * as classes from './VideoNavbar.scss';
import { NavLink } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { startFileScan } from '../../../store/scanning/scanning.actions';
import { logout } from '../../../store/auth/auth.actions';
import NavbarItem from './NavbarItem';

const VideoNavbar = (props) => {
    const dispatch = useDispatch();
    const { history } = useReactRouter();
    const [ isOpen, setOpen ] = useState(false);
    const { firstName, lastName } = useSelector(state => state.auth.userDetails, shallowEqual);
    const { disabled } = props;

    const onScanDirClick = async () => {
        await dispatch(startFileScan());
        history.push('/scanning');
    };

    const fullName = `${firstName} ${lastName}`;

    return (
        <Navbar className={ classes.VideoNavbar } color="dark" dark expand="md">
            <Container>
                <NavbarBrand
                    tag="div"
                    disabled={ disabled }
                >
                    <NavLink
                        to="/"
                        activeClassName={ classes.active }
                        className={ classes.link }
                    >
                        Video Manager
                    </NavLink>
                </NavbarBrand>
                {
                    !disabled &&
                    <>
                        <NavbarToggler onClick={ () => setOpen(!isOpen) } />
                        <Collapse isOpen={ isOpen } navbar>
                            <Nav navbar>
                                <NavbarItem
                                    id="videoListLink"
                                    to="/list"
                                    exact
                                    text="Video List"
                                    isLink
                                />
                                <NavbarItem
                                    id="manageFiltersLink"
                                    to="/filters"
                                    exact
                                    text="Manage Filters"
                                    isLink
                                />
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavbarItem
                                    id="scanDirectoryLink"
                                    onClick={ onScanDirClick }
                                    text="Scan Directory"
                                />
                                <UncontrolledDropdown nav inNavbar className={ classes.dropdown }>
                                    <DropdownToggle nav caret>{ fullName }</DropdownToggle>
                                    <DropdownMenu right className={ classes.dropdown }>
                                        <DropdownItem>
                                            <NavbarItem
                                                id="userProfileLink"
                                                text="Profile"
                                            />
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavbarItem
                                                id="logoutLink"
                                                onClick={ () => dispatch(logout()) }
                                                text="Logout"
                                            />
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </>
                }
            </Container>
        </Navbar>
    );
};

VideoNavbar.defaultProps = {
    disabled: false
};
VideoNavbar.propTypes = {
    disabled: PropTypes.bool
};

export default VideoNavbar;
