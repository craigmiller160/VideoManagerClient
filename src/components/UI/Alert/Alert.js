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
import classes from './Alert.module.scss';
import { useDispatch } from 'react-redux';
import { hideAlert } from '../../../store/alert/alert.actions';

const Alert = (props) => {
	const dispatch = useDispatch();
	const {
		alert: { color, message, show }
	} = props;
	const rootClasses = [classes.Alert, classes[color]];
	if (show) {
		rootClasses.push(classes.show);
	}

	// This is here to override the behavior in AppContent to close the alert on click
	const click = (event) => event.stopPropagation();

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div id="alert-box" className={rootClasses.join(' ')} onClick={click}>
			<button aria-label="close" onClick={() => dispatch(hideAlert())}>
				<span aria-hidden="true">X</span>
			</button>
			<span>{message}</span>
		</div>
	);
};

Alert.propTypes = {
	alert: PropTypes.shape({
		color: PropTypes.string,
		message: PropTypes.string,
		show: PropTypes.bool
	})
};

export default Alert;
