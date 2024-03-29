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
import { mount } from 'enzyme';
import FilterListItem from 'components/AppContent/ManageVideoFilters/FilterListItems/FilterListItem/FilterListItem';

const id = 'MyId';
const label = 'MyLabel';
const click = jest.fn();

const defaultProps = {
	id,
	label,
	click
};

const doMount = (props = defaultProps) => mount(<FilterListItem {...props} />);

describe('FilterListItem', () => {
	beforeEach(() => {
		click.mockReset();
	});

	it('renders correctly', () => {
		const component = doMount();
		expect(component.find('p')).toHaveLength(1);
		expect(component.find('p').text()).toEqual(label);
		expect(component.find('p').props()).toEqual(
			expect.objectContaining({
				id
			})
		);
	});

	it('calls click listener', () => {
		const component = doMount();
		component.find('p').simulate('click');
		expect(click).toHaveBeenCalled();
	});
});
