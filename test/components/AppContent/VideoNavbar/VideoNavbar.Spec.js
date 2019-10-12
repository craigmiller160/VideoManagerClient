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
        expect(component.find('VideoNavbar').props()).toEqual(expect.objectContaining({
            disabled: false
        }));
        expect(component.find('NavbarBrand')).toHaveLength(1);
        expect(component.find('NavbarItem')).toHaveLength(4);
        expect(component.find('NavbarToggler')).toHaveLength(1);

        const testNavbarItem = (index, props) => {
            expect(component.find('NavbarItem').at(index).props()).toEqual(props);
        };

        testNavbarItem(0, {
            id: 'videoListLink',
            to: '/list',
            exact: true,
            isLink: true,
            text: 'Video List'
        });
        testNavbarItem(1, {
            id: 'manageFiltersLink',
            to: '/filters',
            exact: true,
            isLink: true,
            text: 'Manage Filters'
        });
        testNavbarItem(2, {
            id: 'scanDirectoryLink',
            onClick: expect.any(Function),
            text: 'Scan Directory'
        });
        testNavbarItem(3, {
            id: 'logoutLink',
            onClick: expect.any(Function),
            text: 'Logout'
        });

        throw new Error('Add tests for dropdown');
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
        expect(component.find('NavbarItem')).toHaveLength(0);
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

    it('renders without scanning role', () => {
        throw new Error('Finish this');
    });

    it('renders without edit role', () => {
        throw new Error('Finish this');
    });

    describe('click actions', () => {
        beforeEach(() => {
            push.mockClear();
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
