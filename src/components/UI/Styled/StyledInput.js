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

import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.input`
	border: 1px solid ${(props) => (props.hasError ? '#dc3545' : 'lightgray')};
	border-radius: 3px;
	display: block;
	width: 100%;
	font-size: 1rem;
	padding: 2px 8px;
	line-height: 1.5;
	font-weight: 400;
	height: calc(2.25rem + 2px);
`;
StyledInput.displayName = 'StyledInput';
StyledInput.propTypes = {
	hasError: PropTypes.bool
};
StyledInput.defaultProps = {
	hasError: false
};

export default StyledInput;
