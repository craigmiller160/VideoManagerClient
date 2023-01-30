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
import AddButton from 'components/UI/AddButton/AddButton';

const id = 'id';
const addItem = jest.fn();
const defaultProps = {
	id,
	addItem
};

const doMount = (props = defaultProps) => mount(<AddButton {...props} />);

describe('AddButton', () => {
	beforeEach(() => {
		addItem.mockReset();
	});

	it('renders correctly', () => {
		const component = doMount();
		expect(component.find('button').props().id).toEqual(id);
		expect(component.find('button')).toHaveLength(1);
		expect(component.find('button').text()).toEqual('+');
	});

	it('calls addItem on click', () => {
		const component = doMount();
		component.find('button').simulate('click');
		expect(addItem).toHaveBeenCalled();
	});
});
