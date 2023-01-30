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
import FilterListItem from './FilterListItem/FilterListItem';

const FilterListItems = (props) => (
	<>
		{props.items.map(({ value, label }, index) => (
			<FilterListItem
				id={`${props.type}-filter-item-${index}`}
				key={value}
				label={label}
				value={value}
				click={() => props.showEditModal(index)}
			/>
		))}
	</>
);

FilterListItems.propTypes = {
	type: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.number,
			label: PropTypes.string
		})
	),
	showEditModal: PropTypes.func
};

export default FilterListItems;
