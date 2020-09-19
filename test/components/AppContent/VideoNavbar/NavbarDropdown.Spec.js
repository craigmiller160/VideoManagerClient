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

import NavbarDropdown from 'components/AppContent/VideoNavbar/NavbarDropdown';
import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';

jest.mock('store/auth/auth.actions', () => ({
    logout: () => ({
        type: 'LOGOUT'
    })
}));

const firstName = 'Bob';
const lastName = 'Saget';
const defaultStoreState = {
    auth: {
        userDetails: {
            firstName,
            lastName
        }
    }
};

const doMount = mountTestComponent(NavbarDropdown, {
    defaultStoreState,
    defaultInitialRouterEntries: ['/']
});

const testRendering = (component, { isProfileRoute = false } = {}) => {
    const uncontrolledDropdown = component.find('UncontrolledDropdown');
    const dropdownToggle = component.find('DropdownToggle');
    const dropdownMenu = component.find('DropdownMenu');
    const navbarItems = component.find('NavbarItem');

    expect(uncontrolledDropdown).toHaveLength(1);
    expect(uncontrolledDropdown.props()).toEqual({
        nav: true,
        inNavbar: true,
        className: 'NavbarDropdown',
        children: expect.any(Array)
    });

    expect(dropdownToggle).toHaveLength(1);
    expect(dropdownToggle.props()).toEqual(expect.objectContaining({
        nav: true,
        caret: true,
        className: isProfileRoute ? 'active' : ''
    }));
    expect(dropdownToggle.text()).toEqual(`${firstName} ${lastName}`);

    expect(dropdownMenu).toHaveLength(1);
    expect(dropdownMenu.props()).toEqual(expect.objectContaining({
        right: true,
        className: 'dropdown'
    }));

    expect(navbarItems).toHaveLength(2);
    expect(navbarItems.at(0).props()).toEqual({
        id: 'userProfileLink',
        text: 'Profile',
        className: 'dropdownItem',
        isLink: true,
        exact: true,
        to: '/profile'
    });
    expect(navbarItems.at(1).props()).toEqual({
        id: 'logoutLink',
        onClick: expect.any(Function),
        className: 'dropdownItem',
        text: 'Logout',
        isLink: false,
        exact: false
    });
};

describe('NavbarDropdown', () => {
    describe('rendering', () => {
        it('renders correctly', () => {
            const { component } = doMount();
            testRendering(component);
        });

        it('renders with profile route', () => {
            const { component } = doMount({
                initialRouterEntries: ['/profile']
            });
            testRendering(component, { isProfileRoute: true });
        });
    });

    describe('callbacks', () => {
        it('dispatches logout action', () => {
            const { component, store } = doMount();
            component.find('NavbarItem#logoutLink').props().onClick();
            expect(store.getActions()).toEqual([
                { type: 'LOGOUT' }
            ]);
        });
    });
});