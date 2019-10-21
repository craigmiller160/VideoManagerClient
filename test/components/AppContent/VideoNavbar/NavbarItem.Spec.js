import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import NavbarItem from '../../../../src/components/AppContent/VideoNavbar/NavbarItem';

const onClick = jest.fn();
const defaultProps = {
    id: 'id',
    to: '/list',
    text: 'text',
    exact: true,
    isLink: true,
    onClick,
    className: 'className'
};

const doMount = (props = defaultProps) => mount(
    <MemoryRouter initialEntries={ ['/'] }>
        <NavbarItem { ...props } />
    </MemoryRouter>
);

describe('NavbarItem', () => {
    describe('rendering', () => {
        it('renders as link', () => {
            const component = doMount();
            console.log(component.debug()); // TODO delete this
        });

        it('renders when not link', () => {
            throw new Error('Finish this');
        });

        it('renders when active', () => {
            throw new Error('Finish this');
        });
    });

    describe('callbacks', () => {
        it('handles onClick', () => {
            throw new Error('Finish this');
        });
    });
});