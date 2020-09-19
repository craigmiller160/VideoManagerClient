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
import { act } from 'react-dom/test-utils';
import UserManagementPage from 'components/AppContent/User/Management/UserManagementPage';
import mountTestComponent from '../../../../exclude/testUtil/mountTestComponent';
import resolveComponent from '../../../../exclude/testUtil/resolveComponent';

const defaultProps = {
    history: {
        push: jest.fn()
    }
};

const doMount = mountTestComponent(UserManagementPage, {
    defaultProps,
    defaultInitialRouterEntries: ['/'],
    defaultStoreState: {},
    defaultUseThunk: true
});

const users = [
    {
        userId: 3,
        userName: 'user3',
        roles: []
    },
    {
        userId: 1,
        userName: 'user1',
        roles: []
    },
    {
        userId: 4,
        userName: 'user4',
        roles: []
    },
    {
        userId: 2,
        userName: 'user2',
        roles: []
    }
];

const mockApi = new MockAdapter(API);

describe('UserManagementPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockApi.reset();
        mockApi.onGet('/api/auth/users')
            .reply(200, users);
    });

    describe('rendering', () => {
        it('renders all users', async () => {
            const { component } = doMount();
            await resolveComponent(component);

            expect(component.find('div.title > h3').text()).toEqual('User Management');
            expect(component.find('UserListItem')).toHaveLength(4);

            const testItem = (index, user) => {
                expect(component.find('UserListItem').at(index).props()).toEqual({
                    user: user,
                    changeExpanded: expect.any(Function)
                });
            };

            testItem(0, users[1]);
            testItem(1, users[3]);
            testItem(2, users[0]);
            testItem(3, users[2]);

            expect(component.find('Button#add-user-btn')).toHaveLength(1);
        });
    });

    describe('callbacks and actions', () => {
        it('calls history.push when clicking add button', async () => {
            const { component } = doMount();
            await resolveComponent(component);
            component.find('Button#add-user-btn').simulate('click');
            expect(defaultProps.history.push).toHaveBeenCalledWith('/users/new');
        });

        it('updates state in changeExpanded', async () => {
            const { component } = doMount();
            await resolveComponent(component);

            await act(async () => {
                component.find('UserListItem').at(0).props().changeExpanded(1);
                await resolveComponent(component);
            });

            expect(component.find('UserListItem').at(0).props().user).toEqual({
                ...users[1],
                expanded: true
            });
        });

        it('dispatches an error if API call fails', async () => {
            mockApi.reset();
            mockApi.onGet('/api/auth/users')
                .reply(500);

            const { component, store } = doMount();
            await resolveComponent(component);

            const expectedActions = [
                {
                    type: 'alert/showErrorAlert',
                    payload: 'Error: Failed to load users. Message: Request failed with status code 500'
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
