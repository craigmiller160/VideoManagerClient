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
import Scanning from 'components/AppContent/Scanning/Scanning';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('store/scanning/scanning.actions', () => ({
    checkIsScanning: () => (dispatch) => dispatch({ type: 'CheckIsScanning' })
}));

const mockStore = configureMockStore([thunk]);

const doMount = () => {
    const store = mockStore({});
    const component = mount(
        <Provider store={ store }>
            <Scanning />
        </Provider>
    );
    return [component, store];
};

describe('Scanning', () => {
    it('renders component', () => {
        const [component] = doMount();
        expect(component.find('Spinner#scanning-spinner')).toHaveLength(1);
    });

    it('starts and stops calling the checkIsScanning function', () => {
        const [component, store] = doMount();

        jest.runAllImmediates();
        jest.advanceTimersByTime(10000);

        const actionsLength = store.getActions().length;
        const expectedActions = [...new Array(actionsLength).keys()]
            .map(() => ({ type: 'CheckIsScanning' }));

        expect(store.getActions()).toEqual(expectedActions);

        component.unmount();
        jest.advanceTimersByTime(10000);

        expect(store.getActions()).toEqual(expectedActions);
    });
});