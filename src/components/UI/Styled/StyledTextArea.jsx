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

const StyledTextArea = styled.textarea`
	display: block;
	border: 1px solid ${(props) => (props.hasError ? '#dc3545' : 'lightgray')};
	border-radius: 3px;
	width: 100%;
	resize: ${(props) => (props.resize ? 'both' : 'none')};
`;
StyledTextArea.displayName = 'StyledTextArea';
StyledTextArea.propTypes = {
	resize: PropTypes.bool,
	hasError: PropTypes.bool
};
StyledTextArea.defaultProps = {
	resize: false,
	hasError: false
};

export default StyledTextArea;
