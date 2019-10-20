import React from 'react';
import { mount } from 'enzyme';
import VideoNavbar from 'components/AppContent/VideoNavbar/VideoNavbar';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import useReactRouter from 'use-react-router'; // eslint-disable-line import/first

jest.mock('store/scanning/scanning.actions', () => ({
    startFileScan: () => ({ type: 'startFileScan' })
}));
jest.mock('store/auth/auth.actions', () => ({
    logout: () => ({ type: 'logout' })
}));
jest.mock('components/AppContent/VideoNavbar/NavbarItem', () => {
    const NavbarItem = () => <div />;
    return NavbarItem;
});
jest.mock('components/AppContent/VideoNavbar/NavbarDropdown', () => {
    const NavbarDropdown = () => <div />;
    return NavbarDropdown;
});
jest.mock('use-react-router', () => jest.fn());

const push = jest.fn();
useReactRouter.mockImplementation(() => ({
    history: {
        push
    }
}));

const mockStore = configureMockStore([thunk]);

const defaultProps = {
    disabled: false
};

const defaultStore = {
    auth: {
        userDetails: {
            firstName: 'firstName',
            lastName: 'lastName',
            roles: [
                { roleId: 1, name: 'ROLE_ADMIN' },
                { roleId: 2, name: 'ROLE_EDIT' },
                { roleId: 3, name: 'ROLE_SCAN' }
            ]
        }
    }
};

const doMount = (props = defaultProps, store = defaultStore) => {
    const reduxStore = mockStore(store);
    const component = mount(
        <Provider store={ reduxStore }>
            <MemoryRouter initialEntries={ ['/'] }>
                <VideoNavbar { ...props } />
            </MemoryRouter>
        </Provider>
    );
    return [component, store];
};

const testRendering = (component, {
    disabled = false
} = {}) => {
    expect(component.find('VideoNavbar')).toHaveLength(1);
    expect(component.find('VideoNavbar').props()).toEqual(expect.objectContaining({
        disabled
    }));
    expect(component.find('NavbarBrand')).toHaveLength(1);

    const testNavbarItem = (index, props) => {
        expect(component.find('NavbarItem').at(index).props()).toEqual(props);
    };

    if (disabled) {
        expect(component.find('NavbarItem')).toHaveLength(0);
        expect(component.find('NavbarToggler')).toHaveLength(0);
    } else {
        expect(component.find('NavbarItem')).toHaveLength(4);
        expect(component.find('NavbarToggler')).toHaveLength(1);
        expect(component.find('NavbarDropdown')).toHaveLength(1);

        testNavbarItem(0, {
            id: 'videoListLink',
            to: '/videos',
            exact: true,
            isLink: true,
            text: 'Videos'
        });
        testNavbarItem(1, {
            id: 'manageFiltersLink',
            to: '/filters',
            exact: true,
            isLink: true,
            text: 'Filters'
        });
        testNavbarItem(2, {
            id: 'userManagementLink',
            to: '/users',
            isLink: true,
            text: 'Users'
        });
        testNavbarItem(3, {
            id: 'scanDirectoryLink',
            onClick: expect.any(Function),
            text: 'Scan'
        });
    }

};

describe('VideoNavbar', () => {
    describe('rendering', () => {
        it('renders with all roles', () => {
            const [component] = doMount();
            testRendering(component);
        });

        it('renders with disabled', () => {
            const [component] = doMount({
                ...defaultProps,
                disabled: true
            });
            testRendering(component, {
                disabled: true
            });
        });

        it('renders without scanning role', () => {
            throw new Error('Finish this');
        });

        it('renders without edit role', () => {
            throw new Error('Finish this');
        });

        it('renders without admin role', () => {
            throw new Error('Finish this');
        });
    });

    describe('click actions', () => {
        beforeEach(() => {
            push.mockClear();
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

        it('clicks on scan directory link', async () => {
            const [component, store] = doMount();
            await component.find('NavbarItem#scanDirectoryLink').props().onClick();
            expect(store.getActions()).toEqual([
                { type: 'startFileScan' }
            ]);
            expect(push).toHaveBeenCalledWith('/scanning');
        });

        it('clicks on logout link', () => {
            const [component, store] = doMount();
            component.find('NavbarItem#logoutLink').props().onClick();
            expect(store.getActions()).toEqual([
                { type: 'logout' }
            ]);
        });
    });
});
