/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, NavLink as BootLink } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classes from './NavbarItem.module.scss';
import useReactRouter from 'use-react-router';
import newid from '../../../utils/newid';

const NavbarItem = (props) => {
	const {
		history: {
			location: { pathname }
		}
	} = useReactRouter();
	const { id, to, text, exact, isLink, onClick, className } = props;

	const navItemClasses = [classes.NavbarItem];
	if (className) {
		navItemClasses.push(className);
	}

	const baseId = id || newid();

	return (
		<NavItem
			tag="div"
			className={navItemClasses.join(' ')}
			active={to && pathname === to}
		>
			<BootLink
				tag="div"
				id={`${baseId}_bootLink`}
				className={classes['use-pointer']}
				onClick={onClick}
			>
				{isLink && (
					<NavLink
						id={`${baseId}_navLink`}
						to={to}
						activeClassName={classes.active}
						className={classes.link}
						exact={exact}
					>
						{text}
					</NavLink>
				)}
				{!isLink && <span id={`${baseId}_text`}>{text}</span>}
			</BootLink>
		</NavItem>
	);
};
NavbarItem.propTypes = {
	id: PropTypes.string,
	to: PropTypes.string,
	text: PropTypes.string,
	exact: PropTypes.bool,
	isLink: PropTypes.bool,
	onClick: PropTypes.func,
	className: PropTypes.string
};
NavbarItem.defaultProps = {
	exact: false,
	isLink: false
};

export default NavbarItem;
