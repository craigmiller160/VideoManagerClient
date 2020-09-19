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

import API from 'services/API';
import MockAdapter from 'axios-mock-adapter';
import UserProfile from 'components/AppContent/User/UserDetails/UserProfile';
import mountTestComponent from '../../../../exclude/testUtil/mountTestComponent';
import resolveComponent from '../../../../exclude/testUtil/resolveComponent';
import { ROLE_ADMIN, ROLE_EDIT } from 'utils/securityConstants';

jest.mock('store/auth/auth.actions', () => ({
    saveUserProfile: (values) => ({
        type: 'saveUserProfile',
        payload: values
    })
}));

const roles = [
    { roleId: 1, name: ROLE_ADMIN },
    { roleId: 2, name: ROLE_EDIT }
];

const formattedRoles = [
    { value: 1, label: ROLE_ADMIN },
    { value: 2, label: ROLE_EDIT }
];

const defaultStoreState = {
    auth: {
        userDetails: {
            userId: 1,
            userName: 'userName',
            roles: []
        }
    }
};

const doMount = mountTestComponent(UserProfile, {
    defaultStoreState,
    defaultUseThunk: true
});

const mockApi = new MockAdapter(API);

const testRendering = (component, { hasAdminRole = false, hasError = false } = {}) => {
    const userDetailsPage = component.find('UserDetailsPage');
    expect(userDetailsPage).toHaveLength(1);

    expect(userDetailsPage.props()).toEqual(expect.objectContaining({
        pageTitle: 'User Profile',
        enableRoles: hasAdminRole,
        loading: false,
        userDetails: expect.any(Object),
        roles: hasAdminRole && !hasError ? formattedRoles : [],
        saveUser: expect.any(Function)
    }));
};

describe('UserProfile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockApi.reset();
    });

    describe('rendering', () => {
        it('renders with admin role', async () => {
            mockApi.onGet('/api/auth/roles')
                .reply(200, roles);
            const { component, store } = doMount({
                storeState: {
                    ...defaultStoreState,
                    auth: {
                        ...defaultStoreState.auth,
                        userDetails: {
                            ...defaultStoreState.auth.userDetails,
                            roles: [
                                { roleId: 1, name: ROLE_ADMIN }
                            ]
                        }
                    }
                }
            });
            await resolveComponent(component);
            testRendering(component, {
                hasAdminRole: true
            });
            expect(store.getActions()).not.toEqual(expect.arrayContaining([
                { type: 'alert/showErrorAlert', payload: expect.any(String) }
            ]));
        });

        it('renders without admin role', async () => {
            mockApi.onGet('/api/auth/roles')
                .reply(200, roles);
            const { component, store } = doMount();
            await resolveComponent(component);
            testRendering(component);
            expect(store.getActions()).not.toEqual(expect.arrayContaining([
                { type: 'alert/showErrorAlert', payload: expect.any(String) }
            ]));
        });

        it('renders with error loading roles', async () => {
            const { component, store } = doMount({
                storeState: {
                    ...defaultStoreState,
                    auth: {
                        ...defaultStoreState.auth,
                        userDetails: {
                            ...defaultStoreState.auth.userDetails,
                            roles: [
                                { roleId: 1, name: ROLE_ADMIN }
                            ]
                        }
                    }
                }
            });
            await resolveComponent(component);
            testRendering(component, {
                hasAdminRole: true,
                hasError: true
            });
            expect(store.getActions()).toEqual(expect.arrayContaining([
                {
                    type: 'alert/showErrorAlert',
                    payload: 'Error: Error loading roles Message: Request failed with status code 404'
                }
            ]));
        });
    });

    describe('actions and callbacks', () => {
        it('save', async () => {
            const { component, store } = doMount();
            await resolveComponent(component);
            const payload = { userId: 1 };
            component.find('UserDetailsPage').props().saveUser(payload);
            expect(store.getActions()).toEqual(expect.arrayContaining([
                { type: 'saveUserProfile', payload }
            ]));
        });
    });
});
