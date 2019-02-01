import React from 'react';
import { mount } from 'enzyme';
import VideoNavbar from '../VideoNavbar';
import toJson from 'enzyme-to-json';

jest.mock('react-router-dom', () => ({ Link: () => 'Link' }));

const mountComponent = (props = {}) => mount(
    <VideoNavbar { ...props } />
);

describe('VideoNavbar', () => {
    it('renders successfully', () => {
        const component = mountComponent();
        expect(toJson(component.find('VideoNavbar'))).toMatchSnapshot();
    });

    it('toggles the collapse open and closed', () => {
        const navbar = mountComponent();
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
        const startFileScan = jest.fn();
        const component = mountComponent({ startFileScan });
        const scanDirectoryBtn = component.find('NavLink#scanDirectory');
        scanDirectoryBtn.simulate('click');
        expect(startFileScan).toHaveBeenCalledTimes(1);
    });
});