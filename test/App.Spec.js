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
import App from 'App';

jest.mock('components/AppContent/AppContent', () => {
	const AppContent = (props) => <div {...props} />;
	return AppContent;
});

describe('App', () => {
	it('renders properly', () => {
		const component = mount(<App />);
		expect(component.find('HelmetWrapper')).toHaveLength(1);
		expect(component.find('Provider')).toHaveLength(1);
		expect(component.find('BrowserRouter')).toHaveLength(1);
		expect(component.find('#theme-provider')).toHaveLength(1);
		expect(component.find('AppContent')).toHaveLength(1);
	});
});
