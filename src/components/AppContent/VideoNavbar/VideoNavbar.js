import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink as BootLink } from 'reactstrap';
import * as classes from './VideoNavbar.scss'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { startFileScan } from '../../../store/scanning/scanning.actions';

const VideoNavbar = (props) => {
    const dispatch = useDispatch();
    const { history } = useReactRouter();
    const [ isOpen, setOpen ] = useState(false);
    const { disabled, logout } = props;
    const pathname = history.location.pathname;

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
                                <NavItem active={ pathname === '/list' }>
                                    <BootLink
                                        tag="div"
                                        id="videoList"
                                    >
                                        <NavLink
                                            to="/list"
                                            activeClassName={ classes.active }
                                            className={ classes.link }
                                            exact
                                        >
                                            Video List
                                        </NavLink>
                                    </BootLink>
                                </NavItem>
                                <NavItem active={ pathname === '/filters' }>
                                    <BootLink
                                        tag="div"
                                        id="manageFilters"
                                    >
                                        <NavLink
                                            to="/filters"
                                            activeClassName={ classes.active }
                                            className={ classes.link }
                                        >
                                            Manage Filters
                                        </NavLink>
                                    </BootLink>
                                </NavItem>
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
                                        onClick={ logout }
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
    disabled: PropTypes.bool,
    logout: PropTypes.func
};

export default VideoNavbar;