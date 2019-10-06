import React from 'react';
import { mount } from 'enzyme';
import VideoNavbar from 'components/AppContent/VideoNavbar/VideoNavbar';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Switch, Route, MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

jest.mock('store/scanning/scanning.actions', () => ({
    startFileScan: () => ({ type: 'startFileScan' })
}));
jest.mock('store/auth/auth.actions', () => ({
    logout: () => ({ type: 'logout' })
}));

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
                <Switch>
                    <Route
                        path="/list"
                        render={ () => <p id="list">List</p> }
                    />
                </Switch>
            </MemoryRouter>
        </Provider>
    );
    return [component, store];
};

describe('VideoNavbar', () => {
    it('renders successfully', () => {
        const [component] = doMount();
        expect(component.find('VideoNavbar')).toHaveLength(1);
        expect(component.find('VideoNavbar').props()).toEqual(expect.objectContaining({
            disabled: false
        }));
        expect(component.find('NavbarBrand')).toHaveLength(1);
        expect(component.find('NavItem')).toHaveLength(4);
        expect(component.find('NavbarToggler')).toHaveLength(1);

        expect(component.find('NavItem').at(0).text()).toEqual('Video List');
        expect(component.find('NavItem').at(1).text()).toEqual('Manage Filters');
        expect(component.find('NavItem').at(2).text()).toEqual('Scan Directory');
        expect(component.find('NavItem').at(3).text()).toEqual('Logout');
    });

    it('hides/disables items', () => {
        const [component] = doMount({
            ...defaultProps,
            disabled: true
        });
        expect(component.find('VideoNavbar')).toHaveLength(1);
        expect(component.find('VideoNavbar').props()).toEqual(expect.objectContaining({
            disabled: true
        }));
        expect(component.find('NavbarBrand')).toHaveLength(1);
        expect(component.find('NavItem')).toHaveLength(0);
        expect(component.find('NavbarToggler')).toHaveLength(0);
    });

    it('toggles the collapse open and closed', () => {
        const [component] = doMount();
        const toggle = component.find('VideoNavbar NavbarToggler');
        expect(component.find('Collapse').props()).toEqual(expect.objectContaining({
            isOpen: false
        }));
        toggle.simulate('click');
        expect(component.find('Collapse').props()).toEqual(expect.objectContaining({
            isOpen: true
        }));
    });

    describe('click actions', () => {

        it('clicks on scan directory link', () => {
            const [component, store] = doMount();
            component.find('a#scanDirectory').simulate('click');
            expect(store.getActions()).toEqual([
                { type: 'startFileScan' }
            ]);
            throw new Error('Add check for history'); // TODO delete this
        });

        it('clicks on logout link', () => {
            const [component, store] = doMount();
            component.find('a#logout').simulate('click');
            expect(store.getActions()).toEqual([
                { type: 'logout' }
            ]);
        });
    });
});
