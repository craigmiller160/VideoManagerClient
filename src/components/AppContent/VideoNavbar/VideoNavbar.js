import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import * as classes from './VideoNavbar.scss'
import { Link } from 'react-router-dom';

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

    handleScanDirectory = () => {
        this.props.startFileScan();
    };

    handleManageFilters = () => {
        this.props.manageFilters();
    };

    render() {
        const { isOpen } = this.state;
        const { isScanning } = this.props;

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
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink
                                            id="manageFilters"
                                            className={ classes['use-pointer'] }
                                            onClick={ this.handleManageFilters }>
                                            Manage Filters
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            id="scanDirectory"
                                            className={ classes['use-pointer'] }
                                            onClick={ this.handleScanDirectory }>
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
    manageFilters: PropTypes.func.isRequired,
    isScanning: PropTypes.bool
};

export default VideoNavbar;