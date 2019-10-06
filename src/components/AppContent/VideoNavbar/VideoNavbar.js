import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink as BootLink } from 'reactstrap';
import * as classes from './VideoNavbar.scss'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startFileScan } from '../../../store/scanning/scanning.actions';
import { logout } from '../../../store/auth/auth.actions';
import NavbarItem from './NavbarItem';

const VideoNavbar = (props) => {
    const dispatch = useDispatch();
    const [ isOpen, setOpen ] = useState(false);
    const { disabled } = props;

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
                                />
                                <NavbarItem
                                    id="manageFiltersLink"
                                    to="/filters"
                                    exact
                                    text="Manage Filters"
                                />
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <BootLink
                                        id="scanDirectory"
                                        className={ classes['use-pointer'] }
                                        onClick={ () => dispatch(startFileScan()) }
                                    >
                                        Scan Directory
                                    </BootLink>
                                </NavItem>
                                <NavItem>
                                    <BootLink
                                        id="logout"
                                        className={ classes['use-pointer'] }
                                        onClick={ () => dispatch(logout()) }
                                    >
                                        Logout
                                    </BootLink>
                                </NavItem>
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
