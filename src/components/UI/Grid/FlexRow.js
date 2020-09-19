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

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
    width: 100%;
`;
FlexRow.displayName = 'FlexRow';
FlexRow.propTypes = {
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string
};
FlexRow.defaultProps = {
    justifyContent: 'flex-start',
    alignItems: 'stretch'
};

export default FlexRow;
