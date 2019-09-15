import React from 'react';
import { mount } from 'enzyme';
import VideoNavbar from 'components/AppContent/VideoNavbar/VideoNavbar';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// jest.mock('react-router-dom', () => ({ Link: () => 'Link' }));

const mockStore = configureMockStore([thunk]);

const defaultProps = {
    disabled: false
};

const doMount = (props = defaultProps) => {
    const store = mockStore({});
    const component = mount(
        <Provider store={ store }>
            <MemoryRouter initialEntries={ ['/'] }>
                <VideoNavbar { ...props } />
            </MemoryRouter>
        </Provider>
    );
    return [component, store];
};

describe('VideoNavbar', () => {
    it('renders successfully', () => {
        const [component] = doMount();
        expect(component.find('VideoNavbar')).toHaveLength(1);
        expect(component.find('NavbarBrand')).toHaveLength(1);
        expect(component.find('NavItem')).toHaveLength(4);
        expect(component.find('NavbarToggler')).toHaveLength(1);
    });

    it('hides/disables items', () => {
        throw new Error('Finish this');
    });

    it('toggles the collapse open and closed', () => {
        throw new Error('Finish this');
    });

    describe('click actions', () => {
        it('clicks on navbar brand', () => {
            throw new Error('Finish this');
        });

        it('clicks on video list link', () => {
            throw new Error('Finish this');
        });

        it('clicks on filters link', () => {
            throw new Error('Finish this');
        });

        it('clicks on scan directory link', () => {
            throw new Error('Finish this');
        });

        it('clicks on logout link', () => {
            throw new Error('Finish this');
        });
    });




    // it('hides/disables items if scanning', () => {
    //     const component = mountComponent({
    //         ...props,
    //         disabled: true
    //     });
    //     expect(component.find('VideoNavbar')).toHaveLength(1);
    //     expect(component.find('NavItem')).toHaveLength(0);
    //     expect(component.find('NavbarToggler')).toHaveLength(0);
    //     expect(component.find('NavbarBrand')).toHaveLength(1);
    //     expect(component.find('NavbarBrand').props()).toEqual(expect.objectContaining({
    //         disabled: true
    //     }));
    // });
    //
    // it('toggles the collapse open and closed', () => {
    //     const component = mountComponent(props);
    //     const toggle = component.find('VideoNavbar NavbarToggler');
    //
    //     expect(component.find('Collapse').props()).toEqual(expect.objectContaining({
    //         isOpen: false
    //     }));
    //     toggle.simulate('click');
    //     expect(component.find('Collapse').props()).toEqual(expect.objectContaining({
    //         isOpen: true
    //     }));
    // });
    //
    // it('Starts file scan', () => {
    //     const component = mountComponent(props);
    //     const scanDirectoryBtn = component.find('NavLink#scanDirectory');
    //     scanDirectoryBtn.simulate('click');
    //     expect(startFileScan).toHaveBeenCalled();
    // });
});