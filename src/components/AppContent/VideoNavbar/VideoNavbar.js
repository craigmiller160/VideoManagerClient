import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import * as classes from './VideoNavbar.scss'
import { Link, withRouter } from 'react-router-dom';

class VideoNavbar extends Component {

    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                isOpen: !prevState.isOpen
            }
        });
    };

    handleManageFilters = () => {
        this.props.history.push('/filters')
    };

    handleVideoList = () => {
        this.props.history.push('/');
    };

    render() {
        const { isOpen } = this.state;
        const { isScanning, history, startFileScan } = this.props;
        const pathname = history.location.pathname;

        return (
            <Navbar className={ classes.VideoNavbar } color="dark" dark expand="md">
                <Container>
                    <NavbarBrand
                        tag={ Link }
                        to="/"
                        disabled={ isScanning }
                    >
                        Video Manager
                    </NavbarBrand>
                    {
                        !isScanning &&
                        <>
                            <NavbarToggler onClick={ this.toggle } />
                            <Collapse isOpen={ isOpen } navbar>
                                <Nav navbar>
                                    <NavItem active={ pathname === '/' }>
                                        <NavLink
                                            id="videoList"
                                            className={ classes['use-pointer'] }
                                            onClick={ () => history.push('/') }
                                        >
                                            Video List
                                        </NavLink>
                                    </NavItem>
                                    <NavItem active={ pathname === '/filters' }>
                                        <NavLink
                                            id="manageFilters"
                                            className={ classes['use-pointer'] }
                                            onClick={ () => history.push('/filters') }
                                        >
                                            Manage Filters
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink
                                            id="scanDirectory"
                                            className={ classes['use-pointer'] }
                                            onClick={ startFileScan }
                                        >
                                            Scan Directory
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </>
                    }
                </Container>
            </Navbar>
        );
    }

}

VideoNavbar.defaultProps = {
    isScanning: false
};

VideoNavbar.propTypes = {
    startFileScan: PropTypes.func.isRequired,
    isScanning: PropTypes.bool
};

export default withRouter(VideoNavbar);