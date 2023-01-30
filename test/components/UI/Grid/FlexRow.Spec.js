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

import FlexRow from 'components/UI/Grid/FlexRow';
import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';

const doMount = mountTestComponent(FlexRow);

describe('FlexRow', () => {
	it('renders without custom props', () => {
		const { component } = doMount();
		expect(component).toHaveStyleRule('justify-content', 'flex-start');
		expect(component).toHaveStyleRule('align-items', 'stretch');
	});

	it('renders with custom props', () => {
		const { component } = doMount({
			props: {
				justifyContent: 'center',
				alignItems: 'flex-start'
			}
		});
		expect(component).toHaveStyleRule('justify-content', 'center');
		expect(component).toHaveStyleRule('align-items', 'flex-start');
	});
});
