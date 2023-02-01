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
import { SelectComponent } from 'components/UI/form/Select/Select';
import { mount } from 'enzyme';

describe('Select', () => {
	const props = {
		label: 'My Select',
		name: 'MySelect',
		options: [
			{ label: 'Opt1', value: 'opt1' },
			{ label: 'Opt2', value: 'opt2' }
		],
		multi: false,
		input: {
			onChange: jest.fn()
		}
	};

	it('should render correctly', () => {
		const component = mount(<SelectComponent {...props} />);
		expect(component.find('StyledFormGroupDiv')).toHaveLength(1);
		expect(component.find('SelectComponent')).toHaveLength(1);
		expect(component.find('SelectComponent').props()).toEqual(
			expect.objectContaining({
				...props
			})
		);
		expect(component.find('label')).toHaveLength(1);
		expect(component.find('label').text()).toEqual('My Select');
	});
});
