import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink as BootLink } from 'reactstrap';
import * as classes from './VideoNavbar.scss'
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

const VideoNavbar = (props) => {
    const [ isOpen, setOpen ] = useState(false);
    const { disabled, history, startFileScan } = props;
    const pathname = history.location.pathname;

    return (
        <Navbar className={ classes.VideoNavbar } color="dark" dark expand="md">
            <Container>
                <NavbarBrand
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
                                <NavItem active={ pathname === '/' }>
                                    <BootLink
                                        id="videoList"
                                    >
                                        <NavLink
                                            to="/"
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
                                        onClick={ startFileScan }
                                    >
                                        Scan Directory
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

const propTypes = {
    startFileScan: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    history: PropTypes.object
};

VideoNavbar.propTypes = {
    ...propTypes
};

const VideoNavbarRouter = withRouter(VideoNavbar);
VideoNavbarRouter.propTypes = {
    ...propTypes,
    history: PropTypes.object
};
export default VideoNavbarRouter;