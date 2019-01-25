import React, { Component } from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavbarToggler,
    Collapse,
    NavLink,
    Container
} from 'reactstrap';
import * as classes from './VideoNavbar.scss';

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

    render() {

        return (
            <Navbar className={classes.VideoNavbar} color="dark" dark expand="md">
                <Container>
                    <NavbarBrand href="/">Video Manager</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink>Scan Directory</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }

}

export default VideoNavbar;