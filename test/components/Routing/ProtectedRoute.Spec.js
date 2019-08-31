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