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

    render() {
        const { isOpen } = this.state;

        return (
            <Navbar className={ classes.VideoNavbar } color="dark" dark expand="md">
                <Container>
                    <NavbarBrand tag={ Link } to="/">Video Manager</NavbarBrand>
                    <NavbarToggler onClick={ this.toggle } />
                    <Collapse isOpen={ isOpen } navbar>
                        <Nav className="ml-auto" navbar>
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
                </Container>
            </Navbar>
        );
    }

}

VideoNavbar.propTypes = {
    startFileScan: PropTypes.func
};

export default VideoNavbar;