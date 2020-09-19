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
import { MemoryRouter } from 'react-router';
import ProtectedRoute from '../../../src/components/Routing/ProtectedRoute';

const Component = () => <div />;

const doMount = (allow) => mount(
    <MemoryRouter>
        <ProtectedRoute
            path="/path"
            component={ Component }
            rules={ [
                { allow: () => allow, redirect: '/other' }
            ] }
        />
    </MemoryRouter>
);

describe('ProtectedRoute', () => {
    it('renders the route', () => {
        const component = doMount(true);
        expect(component.find('Redirect')).toHaveLength(0);
        expect(component.find('Route')).toHaveLength(1);
        expect(component.find('Route').props()).toEqual(expect.objectContaining({
            path: '/path'
        }));
    });

    it('redirects for failed rule', () => {
        const component = doMount(false);
        expect(component.find('Redirect')).toHaveLength(1);
        expect(component.find('Route')).toHaveLength(0);
        expect(component.find('Redirect').props()).toEqual(expect.objectContaining({
            to: '/other'
        }));
    });
});