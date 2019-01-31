import React from 'react';
import { mount } from 'enzyme';
import VideoNavbar from '../VideoNavbar';
import { MemoryRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';

const mountComponent = (props) => {
    props = props || {};
    return mount(
        <MemoryRouter initialEntries={ ['/'] }>
            <VideoNavbar { ...props } />
        </MemoryRouter>
    );
};

describe('VideoNavbar', () => {
    it('renders successfully', () => {
        const component = mountComponent();
        expect(toJson(component.find('VideoNavbar'))).toMatchSnapshot();
    });

    it('toggles the collapse open and closed', () => {
        const component = mountComponent();
        const navbar = component.find('VideoNavbar');
        const toggle = component.find('VideoNavbar NavbarToggler');

        expect(navbar.state()).toEqual(expect.objectContaining({
            isOpen: false
        }));
        toggle.simulate('click');
        expect(navbar.state()).toEqual(expect.objectContaining({
            isOpen: true
        }));
    });

    it('Starts file scan', () => {
        const startFileScan = jest.fn();
        const component = mountComponent({ startFileScan });
        const scanDirectoryBtn = component.find('NavLink#scanDirectory');
        scanDirectoryBtn.simulate('click');
        expect(startFileScan).toHaveBeenCalledTimes(1);
    });
});