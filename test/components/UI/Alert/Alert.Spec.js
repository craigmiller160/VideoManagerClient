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
import Alert from 'components/UI/Alert/Alert';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('store/alert/alert.actions', () => ({
    hideAlert: () => (dispatch) => dispatch({ type: 'HideAlert' })
}));

const defaultProps = {
    alert: {
        color: 'success',
        message: 'My Message',
        show: false
    }
};

const defaultState = {};
const mockStore = configureMockStore([thunk]);

const doMount = (state = defaultState, props = defaultProps) => {
    const store = mockStore(state);
    const component = mount(
        <Provider store={ store }>
            <Alert { ...props } />
        </Provider>
    );
    return [component, store];
};

describe('Alert', () => {
    it('renders correctly', () => {
        const [component] = doMount();
        expect(component.find('div.Alert').props()).toEqual(expect.objectContaining({
            className: expect.stringContaining('success')
        }));
        expect(component.find('div.Alert > span').text()).toEqual('My Message');
    });

    it('renders and shows', () => {
        const [component] = doMount(defaultState, {
            ...defaultProps,
            alert: {
                ...defaultProps.alert,
                show: true
            }
        });
        expect(component.find('div.Alert').props()).toEqual(expect.objectContaining({
            className: expect.stringContaining('show')
        }))
    });

    it('calls hideAlert', () => {
        const [component, store] = doMount();
        component.find('button').simulate('click');
        expect(store.getActions()).toEqual([
            { type: 'HideAlert' }
        ]);
    });
});
