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
import VideoNavbar from 'components/AppContent/VideoNavbar/VideoNavbar';
import useReactRouter from 'use-react-router';
import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';
import { login, logout } from '../../../../src/services/AuthApiService';

jest.mock('store/scanning/scanning.actions', () => ({
	startFileScan: () => ({ type: 'startFileScan' })
}));
jest.mock('store/auth/auth.actions', () => ({
	logout: () => ({ type: 'logout' }),
	clearAuth: () => ({ type: 'clearAuth' })
}));
jest.mock('components/AppContent/VideoNavbar/NavbarItem', () => {
	const NavbarItem = () => <div />;
	return NavbarItem;
});
jest.mock('use-react-router', () => jest.fn());
jest.mock('services/AuthApiService', () => ({
	login: jest.fn(),
	logout: jest.fn()
}));

const push = jest.fn();
useReactRouter.mockImplementation(() => ({
	history: {
		push
	}
}));

const defaultProps = {
	disabled: false
};

const defaultStoreState = {
	auth: {
		isAuth: true,
		userDetails: {
			firstName: 'firstName',
			lastName: 'lastName',
			roles: [
				{ roleId: 1, name: 'ROLE_ADMIN' },
				{ roleId: 2, name: 'ROLE_EDIT' },
				{ roleId: 3, name: 'ROLE_SCAN' }
			]
		}
	}
};

const doMount = mountTestComponent(VideoNavbar, {
	defaultProps,
	defaultStoreState,
	defaultInitialRouterEntries: ['/'],
	defaultUseThunk: true
});

const testRendering = (
	component,
	{ disabled = false, isAuth = true, roles = {} } = {}
) => {
	const { hasEdit = true, hasAdmin = true, hasScan = true } = roles;
	expect(component.find('VideoNavbar')).toHaveLength(1);
	expect(component.find('VideoNavbar').props()).toEqual(
		expect.objectContaining({
			disabled
		})
	);
	expect(component.find('NavbarBrand')).toHaveLength(1);

	const testNavbarItem = (index, props) => {
		expect(component.find('NavbarItem').at(index).props()).toEqual(props);
	};

	if (disabled) {
		expect(component.find('NavbarItem')).toHaveLength(0);
		expect(component.find('NavbarToggler')).toHaveLength(0);
	} else {
		expect(component.find('NavbarToggler')).toHaveLength(1);

		let itemIndex = 0;

		if (isAuth) {
			testNavbarItem(itemIndex, {
				id: 'videoListLink',
				to: '/videos',
				exact: true,
				isLink: true,
				text: 'Videos'
			});
			itemIndex++;
		}
		if (isAuth && hasEdit) {
			testNavbarItem(itemIndex, {
				id: 'manageFiltersLink',
				to: '/filters',
				exact: true,
				isLink: true,
				text: 'Filters'
			});
			itemIndex++;
		}
		if (isAuth && hasScan) {
			testNavbarItem(itemIndex, {
				id: 'scanDirectoryLink',
				onClick: expect.any(Function),
				text: 'Scan'
			});
			itemIndex++;
		}
		if (isAuth && hasAdmin) {
			testNavbarItem(itemIndex, {
				id: 'settingsLink',
				text: 'Settings',
				isLink: true,
				to: '/settings'
			});
			itemIndex++;
		}

		testNavbarItem(itemIndex, {
			id: 'authLink',
			text: isAuth ? 'Logout' : 'Login',
			onClick: expect.any(Function)
		});
		itemIndex++;

		expect(component.find('NavbarItem')).toHaveLength(itemIndex);
	}
};

describe('VideoNavbar', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('rendering', () => {
		it('renders with all roles', () => {
			const { component } = doMount();
			testRendering(component);
		});

		it('renders with disabled', () => {
			const { component } = doMount({
				props: {
					disabled: true
				}
			});
			testRendering(component, {
				disabled: true
			});
		});

		it('renders without auth', () => {
			const { component } = doMount({
				storeState: {
					auth: {
						isAuth: false,
						userDetails: {}
					}
				}
			});
			testRendering(component, {
				isAuth: false
			});
		});

		it('renders without scanning role', () => {
			const { component } = doMount({
				storeState: {
					auth: {
						isAuth: true,
						userDetails: {
							...defaultStoreState.auth.userDetails,
							roles: [
								{ roleId: 1, name: 'ROLE_ADMIN' },
								{ roleId: 2, name: 'ROLE_EDIT' }
							]
						}
					}
				}
			});
			testRendering(component, {
				roles: {
					hasScan: false
				}
			});
		});

		it('renders without edit role', () => {
			const { component } = doMount({
				storeState: {
					auth: {
						isAuth: true,
						userDetails: {
							...defaultStoreState.auth.userDetails,
							roles: [
								{ roleId: 1, name: 'ROLE_ADMIN' },
								{ roleId: 3, name: 'ROLE_SCAN' }
							]
						}
					}
				}
			});
			testRendering(component, {
				roles: {
					hasEdit: false
				}
			});
		});

		it('renders without admin role', () => {
			const { component } = doMount({
				storeState: {
					auth: {
						isAuth: true,
						userDetails: {
							...defaultStoreState.auth.userDetails,
							roles: [
								{ roleId: 3, name: 'ROLE_SCAN' },
								{ roleId: 2, name: 'ROLE_EDIT' }
							]
						}
					}
				}
			});
			testRendering(component, {
				roles: {
					hasAdmin: false
				}
			});
		});
	});

	describe('click actions', () => {
		beforeEach(() => {
			push.mockClear();
		});

		it('toggles the collapse open and closed', () => {
			const { component } = doMount();
			const toggle = component.find('VideoNavbar NavbarToggler');
			expect(component.find('Collapse').props()).toEqual(
				expect.objectContaining({
					isOpen: false
				})
			);
			toggle.simulate('click');
			expect(component.find('Collapse').props()).toEqual(
				expect.objectContaining({
					isOpen: true
				})
			);
		});

		it('clicks on scan directory link', async () => {
			const { component, store } = doMount();
			await component
				.find('NavbarItem#scanDirectoryLink')
				.props()
				.onClick();
			expect(store.getActions()).toEqual([{ type: 'startFileScan' }]);
			expect(push).toHaveBeenCalledWith('/scanning');
		});

		describe('authLink click', () => {
			it('login', () => {
				const { component } = doMount({
					storeState: {
						auth: {
							isAuth: false,
							userDetails: {}
						}
					}
				});
				const authLink = component.find('NavbarItem#authLink');
				expect(authLink).toHaveLength(1);
				authLink.props().onClick();
				expect(login).toHaveBeenCalled();
				expect(logout).not.toHaveBeenCalled();
			});

			it('logout', async () => {
				const { component, store } = doMount();
				const authLink = component.find('NavbarItem#authLink');
				expect(authLink).toHaveLength(1);
				await authLink.props().onClick();
				expect(store.getActions()).toEqual([{ type: 'clearAuth' }]);
			});
		});
	});
});
