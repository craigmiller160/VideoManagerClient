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
import { shallow } from 'enzyme';
import ToolTip from 'components/UI/ToolTip';

describe('ToolTip', () => {
	describe('rendering', () => {
		it('renders correctly', () => {
			const component = shallow(
				<ToolTip text="My Text">
					<p>Hello World</p>
				</ToolTip>
			);
			expect(component.find('div.ToolTip')).toHaveLength(1);
			expect(component.find('p').text()).toEqual('Hello World');
			expect(component.find('span.ToolTipText').text()).toEqual(
				'My Text'
			);
		});
	});
});
