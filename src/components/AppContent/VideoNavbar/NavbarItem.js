import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, NavLink as BootLink } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classes from './NavbarItem.scss';
import useReactRouter from 'use-react-router';

const NavbarItem = (props) => {
    const { history: { pathname } } = useReactRouter();
    const {
        id,
        to,
        text
    } = props;

    return (
        <NavItem className={ classes.NavbarItem } active={ pathname === to }>
            <BootLink
                tag="div"
                id={ id }
            >
                <NavLink
                    to={ to }
                    activeClassName={ classes.active }
                    className={ classes.link }
                    exact
                >
                    { text }
                </NavLink>
            </BootLink>
        </NavItem>
    );
};
NavbarItem.propTypes = {
    id: PropTypes.string,
    to: PropTypes.string,
    text: PropTypes.string
};

export default NavbarItem;