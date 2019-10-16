import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import * as classes from './VideoNavbar.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { startFileScan } from '../../../store/scanning/scanning.actions';
import NavbarItem from './NavbarItem';
import NavbarDropdown from './NavbarDropdown';
import {
    hasEditRole as hasEditRoleSelector,
    hasScanRole as hasScanRoleSelector,
    hasAdminRole as hasAdminRoleSelector
} from '../../../store/auth/auth.selectors';

const VideoNavbar = (props) => {
    const dispatch = useDispatch();
    const { history } = useReactRouter();
    const [ isOpen, setOpen ] = useState(false);
    const hasEditRole = useSelector(hasEditRoleSelector);
    const hasScanRole = useSelector(hasScanRoleSelector);
    const hasAdminRole = useSelector(hasAdminRoleSelector);
    const { disabled } = props;

    const onScanDirClick = async () => {
        await dispatch(startFileScan());
        history.push('/scanning');
    };

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
                                {
                                    hasEditRole &&
                                    <NavbarItem
                                        id="manageFiltersLink"
                                        to="/filters"
                                        exact
                                        text="Manage Filters"
                                        isLink
                                    />
                                }
                                {
                                    hasAdminRole &&
                                    <NavbarItem
                                        id="userManagementLink"
                                        to="/users"
                                        text="User Management"
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
                                        text="Scan Directory"
                                    />
                                }
                                <NavbarDropdown />
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
