import React from 'react';
import { mount } from 'enzyme';
import VideoNavbar from '../../../../src/components/AppContent/VideoNavbar/VideoNavbar';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({ Link: () => 'Link' }));

const mountComponent = (props = {}) => mount(
    <MemoryRouter initialEntries={ ['/'] }>
        <VideoNavbar { ...props } />
    </MemoryRouter>
);

const startFileScan = jest.fn();
const manageFilters = jest.fn();
const props = {
    startFileScan,
    manageFilters
};

describe('VideoNavbar', () => {
    it('renders successfully', () => {
        const component = mountComponent(props);
        expect(toJson(component.find('VideoNavbar'))).toMatchSnapshot();
    });

    it('toggles the collapse open and closed', () => {
        const navbar = mountComponent(props);
        const toggle = navbar.find('VideoNavbar NavbarToggler');

        expect(navbar.state()).toEqual(expect.objectContaining({
            isOpen: false
        }));
        toggle.simulate('click');
        expect(navbar.state()).toEqual(expect.objectContaining({
            isOpen: true
        }));
    });

    it('Starts file scan', () => {
        const component = mountComponent(props);
        const scanDirectoryBtn = component.find('NavLink#scanDirectory');
        scanDirectoryBtn.simulate('click');
        expect(startFileScan).toHaveBeenCalled();
    });

    it('Manages filters', () => {
        const component = mountComponent(props);
        const manageFiltersBtn = component.find('NavLink#manageFilters');
        manageFiltersBtn.simulate('click');
        expect(manageFilters).toHaveBeenCalled()
    });
});