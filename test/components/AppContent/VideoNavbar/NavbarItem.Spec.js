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

describe('NavbarItem', () => {
    describe('rendering', () => {
        it('renders as link', () => {
            const { component } = doMount();
            expect(component.find('NavItem')).toHaveLength(1);

            const bootLink = component.find('NavLink#id_bootLink');
            expect(bootLink).toHaveLength(1);
            expect(bootLink.props()).toEqual(expect.objectContaining({
                tag: 'div',
                onClick: expect.any(Function)
            }));

            const navLink = component.find('NavLink#id_navLink');
            expect(navLink).toHaveLength(1);
            expect(navLink.props()).toEqual(expect.objectContaining({
                to: defaultProps.to,
                exact: defaultProps.exact
            }));
            expect(navLink.text()).toEqual(defaultProps.text);

            const textSpan = component.find('span#id_text');
            expect(textSpan).toHaveLength(0);
        });

        it('renders when not link', () => {
            throw new Error('Finish this');
        });

        it('renders when active', () => {
            throw new Error('Finish this');
        });
    });

    describe('callbacks', () => {
        it('handles onClick', () => {
            throw new Error('Finish this');
        });
    });
});