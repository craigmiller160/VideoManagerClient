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
import keycode from 'keycode';
import { reduxForm } from 'redux-form';

const Form = (props) => {
	const { children, handleSubmit, className } = props;

	return (
		<form
			className={className}
			onSubmit={(event) => {
				event.preventDefault();
				handleSubmit(event);
			}}
			onKeyDown={(event) => {
				if (
					keycode(event.keyCode) &&
					keycode(event.keyCode).toLowerCase() === 'enter'
				) {
					event.preventDefault();
					handleSubmit(event);
				}
			}}
		>
			{children}
		</form>
	);
};

Form.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	className: PropTypes.string
};

const ReduxFormForm = reduxForm({})(Form);
ReduxFormForm.propTypes = {
	form: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func, // DEPRECATED
	onSubmit: PropTypes.func.isRequired,
	className: PropTypes.string,
	initialValues: PropTypes.object,
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
	destroyOnUnmount: PropTypes.bool,
	enableReinitialize: PropTypes.bool
};

export default ReduxFormForm;
