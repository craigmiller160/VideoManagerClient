import React from 'react';
import { mount } from 'enzyme';
import VideoNavbar from 'components/AppContent/VideoNavbar/VideoNavbar';
import { MemoryRouter } from 'react-router';

jest.mock('react-router-dom', () => ({ Link: () => 'Link' }));

const mountComponent = (props = {}) => {
    return mount(
        <MemoryRouter initialEntries={ ['/'] }>
            <VideoNavbar { ...props } />
        </MemoryRouter>
    );
};

const startFileScan = jest.fn();
const props = {
    startFileScan,
    disabled: false
};

describe('VideoNavbar', () => {
    it('renders successfully', () => {
        const component = mountComponent(props);
        expect(component.find('VideoNavbar')).toHaveLength(1);
        expect(component.find('NavbarBrand')).toHaveLength(1);
        expect(component.find('NavItem')).toHaveLength(3);
        expect(component.find('NavbarToggler')).toHaveLength(1);
    });

    it('hides/disables items if scanning', () => {
        const component = mountComponent({
            ...props,
            disabled: true
        });
        expect(component.find('VideoNavbar')).toHaveLength(1);
        expect(component.find('NavItem')).toHaveLength(0);
        expect(component.find('NavbarToggler')).toHaveLength(0);
        expect(component.find('NavbarBrand')).toHaveLength(1);
        expect(component.find('NavbarBrand').props()).toEqual(expect.objectContaining({
            disabled: true
        }));
    });

    it('toggles the collapse open and closed', () => {
        const component = mountComponent(props);
        const toggle = component.find('VideoNavbar NavbarToggler');

        expect(component.find('Collapse').props()).toEqual(expect.objectContaining({
            isOpen: false
        }));
        toggle.simulate('click');
        expect(component.find('Collapse').props()).toEqual(expect.objectContaining({
            isOpen: true
        }));
    });

    it('Starts file scan', () => {
        const component = mountComponent(props);
        const scanDirectoryBtn = component.find('NavLink#scanDirectory');
        scanDirectoryBtn.simulate('click');
        expect(startFileScan).toHaveBeenCalled();
    });
});