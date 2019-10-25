import NavbarItem from 'components/AppContent/VideoNavbar/NavbarItem';
import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';

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

const doMount = mountTestComponent(NavbarItem, {
    defaultProps,
    defaultInitialRouterEntries: ['/']
});

const testRendering = (component, { isLink = true, isActive = false } = {}) => {
    const navItem = component.find('NavItem');
    expect(navItem).toHaveLength(1);
    expect(navItem.props()).toEqual(expect.objectContaining({
        className: 'NavbarItem className',
        active: isActive
    }));

    const bootLink = component.find('NavLink#id_bootLink');
    const navLink = component.find('NavLink#id_navLink');
    const textSpan = component.find('span#id_text');

    expect(bootLink).toHaveLength(1);
    expect(bootLink.props()).toEqual(expect.objectContaining({
        tag: 'div',
        onClick: expect.any(Function)
    }));

    if (isLink) {
        expect(navLink).toHaveLength(1);
        expect(navLink.props()).toEqual(expect.objectContaining({
            to: defaultProps.to,
            exact: defaultProps.exact
        }));
        expect(navLink.text()).toEqual(defaultProps.text);

        expect(textSpan).toHaveLength(0);
    } else {
        expect(navLink).toHaveLength(0);

        expect(textSpan).toHaveLength(1);
        expect(textSpan.text()).toEqual(defaultProps.text);
    }
};

describe('NavbarItem', () => {
    beforeEach(() => {
        onClick.mockClear();
    });

    describe('rendering', () => {
        it('renders as link', () => {
            const { component } = doMount();
            testRendering(component, { isLink: true });
        });

        it('renders when not link', () => {
            const { component } = doMount({
                props: {
                    isLink: false
                }
            });
            testRendering(component, { isLink: false });
        });

        it('renders when active', () => {
            const { component } = doMount({
                initialRouterEntries: ['/list']
            });
            testRendering(component, { isActive: true });
        });
    });

    describe('callbacks', () => {
        it('handles onClick', () => {
            const { component } = doMount();
            const value = 'hello';
            component.find('NavLink#id_bootLink').props().onClick(value);
            expect(onClick).toHaveBeenCalledWith(value);
        });
    });
});