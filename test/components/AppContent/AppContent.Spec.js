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

/* eslint-disable react/prop-types */
import React from 'react';
import { act } from 'react-dom/test-utils';
import AppContent from 'components/AppContent/AppContent';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { KeycloakAuthContext } from '@craigmiller160/react-keycloak';

jest.mock('components/UI/Alert/Alert', () => {
	const Alert = (props) => <div>{props.children}</div>;
	return Alert;
});
jest.mock('components/AppContent/AppRoutes', () => {
	const AppRoutes = (props) => <div>{props.children}</div>;
	return AppRoutes;
});
jest.mock('components/AppContent/VideoNavbar/VideoNavbar', () => {
	const VideoNavbar = (props) => <div>{props.children}</div>;
	return VideoNavbar;
});

jest.mock('store/auth/auth.actions', () => ({
	checkAuth: () => ({ type: 'checkAuth' }),
	logout: () => ({ type: 'logout' })
}));
jest.mock('store/scanning/scanning.actions', () => ({
	checkIsScanning: () => ({ type: 'checkIsScanning' })
}));
jest.mock('store/videoSearch/videoSearch.actions', () => ({
	loadFilterOptions: () => ({ type: 'loadFilterOptions' })
}));
jest.mock('store/alert/alert.actions', () => ({
	hideAlert: () => ({ type: 'hideAlert' })
}));

const mockStore = configureMockStore([thunk]);
const defaultState = {
	scanning: {
		isScanning: false
	},
	alert: {},
	auth: {
		isAuth: false
	}
};

const doMount = (state = defaultState, isPostAuthorization = false) => {
	const store = mockStore(state);
	const component = mount(
		<Provider store={store}>
			<MemoryRouter initialEntries={['/']}>
				<KeycloakAuthContext.Provider value={{ isPostAuthorization }}>
					<AppContent />
				</KeycloakAuthContext.Provider>
			</MemoryRouter>
		</Provider>
	);
	return [component, store];
};

describe('AppContent', () => {
	it('renders the initial component pre-effects', () => {
		const [component] = doMount();

		expect(component.find('VideoNavbar')).toHaveLength(1);
		expect(component.find('VideoNavbar').props()).toEqual(
			expect.objectContaining({
				disabled: true
			})
		);
		expect(component.find('Alert')).toHaveLength(0);
		expect(component.find('AppRoutes')).toHaveLength(0);
	});

	it('runs initial loading when authorized', async () => {
		const [component, store] = doMount(
			{
				...defaultState,
				auth: {
					...defaultState.auth,
					isAuth: true
				}
			},
			true
		);
		await act(async () => {
			jest.advanceTimersByTime(10000);
		});
		component.update();

		expect(component.find('VideoNavbar')).toHaveLength(1);
		expect(component.find('VideoNavbar').props()).toEqual(
			expect.objectContaining({
				disabled: false
			})
		);
		expect(component.find('Alert')).toHaveLength(1);
		expect(component.find('AppRoutes')).toHaveLength(1);
		expect(store.getActions()).toEqual([
			{ type: 'loadFilterOptions' },
			{ type: 'checkIsScanning' }
		]);
	});

	it('hides alert on click', async () => {
		const [component, store] = doMount();
		await act(async () => {
			jest.advanceTimersByTime(10000);
		});
		component.update();

		component.find('div').at(0).simulate('click');
		expect(store.getActions()).toEqual(
			expect.arrayContaining([{ type: 'hideAlert' }])
		);
	});
});
