import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import * as classes from './VideoNavbar.scss';
import { NavLink } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { startFileScan } from '../../../store/scanning/scanning.actions';
import NavbarItem from './NavbarItem';
import NavbarDropdown from './NavbarDropdown';
import { ROLE_EDIT, ROLE_SCAN } from '../../../utils/securityConstants';

const VideoNavbar = (props) => {
    const dispatch = useDispatch();
    const { history } = useReactRouter();
    const [ isOpen, setOpen ] = useState(false);
    const userDetails = useSelector(state => state.auth.userDetails, shallowEqual);
    const { disabled } = props;

    const hasEditRole = !!userDetails?.roles?.find((role) => role.name === ROLE_EDIT);
    const hasScanningRole = !!userDetails?.roles?.find((role) => role.name === ROLE_SCAN);

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
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                {
                                    hasScanningRole &&
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
