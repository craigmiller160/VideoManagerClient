import NavbarDropdown from 'components/AppContent/VideoNavbar/NavbarDropdown';
import enzymeCreator from 'react-enzyme-utils';

jest.mock('store/auth/auth.actions', () => ({
    logout: () => ({
        type: 'LOGOUT'
    })
}));

const firstName = 'Bob';
const lastName = 'Saget';
const defaultStoreState = {
    auth: {
        userDetails: {
            firstName,
            lastName
        }
    }
};

const mounter = enzymeCreator({
    component: NavbarDropdown,
    redux: {
        state: defaultStoreState
    },
    router: {
        initialRouterEntries: ['/']
    }
});

const testRendering = (component, { isProfileRoute = false } = {}) => {
    const uncontrolledDropdown = component.find('UncontrolledDropdown');
    const dropdownToggle = component.find('DropdownToggle');
    const dropdownMenu = component.find('DropdownMenu');
    const navbarItems = component.find('NavbarItem');

    expect(uncontrolledDropdown).toHaveLength(1);
    expect(uncontrolledDropdown.props()).toEqual({
        nav: true,
        inNavbar: true,
        className: 'NavbarDropdown',
        children: expect.any(Array)
    });

    expect(dropdownToggle).toHaveLength(1);
    expect(dropdownToggle.props()).toEqual(expect.objectContaining({
        nav: true,
        caret: true,
        className: isProfileRoute ? 'active' : ''
    }));
    expect(dropdownToggle.text()).toEqual(`${firstName} ${lastName}`);

    expect(dropdownMenu).toHaveLength(1);
    expect(dropdownMenu.props()).toEqual(expect.objectContaining({
        right: true,
        className: 'dropdown'
    }));

    expect(navbarItems).toHaveLength(2);
    expect(navbarItems.at(0).props()).toEqual({
        id: 'userProfileLink',
        text: 'Profile',
        className: 'dropdownItem',
        isLink: true,
        exact: true,
        to: '/profile'
    });
    expect(navbarItems.at(1).props()).toEqual({
        id: 'logoutLink',
        onClick: expect.any(Function),
        className: 'dropdownItem',
        text: 'Logout',
        isLink: false,
        exact: false
    });
};

describe('NavbarDropdown', () => {
    describe('rendering', () => {
        it('renders correctly', () => {
            const { component } = mounter();
            testRendering(component);
        });

        it('renders with profile route', () => {
            const { component } = mounter({
                initialRouterEntries: ['/profile']
            });
            testRendering(component, { isProfileRoute: true });
        });
    });

    describe('callbacks', () => {
        it('dispatches logout action', () => {
            const { component, store } = mounter();
            component.find('NavbarItem#logoutLink').props().onClick();
            expect(store.getActions()).toEqual([
                { type: 'LOGOUT' }
            ]);
        });
    });
});