import React, { Component } from 'react';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import * as classes from './VideoNavbar.scss';
import { bindActionCreators } from 'redux';
import { startFileScan } from '../../../store/scanning/scanning.actions';
import { connect } from 'react-redux';
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

        return (
            <Navbar className={classes.VideoNavbar} color="dark" dark expand="md">
                <Container>
                    <NavbarBrand tag={ Link } to="/">Video Manager</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
    startFileScan
}, dispatch);

export default connect(null, mapDispatchToProps)(VideoNavbar);