import UserListItem from 'components/AppContent/User/Management/UserListItem';
import enzymeCreator from 'react-enzyme-utils';
import { ROLE_ADMIN, ROLE_EDIT } from '../../../../../src/utils/securityConstants';

const changeExpanded = jest.fn();
const defaultProps = {
    user: {
        userId: 1,
        firstName: 'firstName',
        lastName: 'lastName',
        userName: 'userName',
        expanded: false,
        roles: [
            { roleId: 1, name: ROLE_EDIT },
            { roleId: 2, name: ROLE_ADMIN }
        ]
    },
    changeExpanded
};

const mounter = enzymeCreator({
    component: UserListItem,
    props: defaultProps,
    router: {
        initialEntries: ['/']
    }
});

const testRendering = (component, { isExpanded = false } = {}) => {
    const rootDiv = component.find('div[data-name="user-list-item-root"]');
    const findP = (dataName) => component.find(`p[data-name="${dataName}"]`);

    expect(rootDiv.props()).toEqual(expect.objectContaining({
        className: isExpanded ? 'UserListItem active' : 'UserListItem',
        onClick: expect.any(Function)
    }));

    const userNameItem = findP('user-item-user-name');
    expect(userNameItem.text()).toEqual(defaultProps.user.userName);

    const fullNameItem = findP('user-item-full-name');
    const fullName = `${defaultProps.user.firstName} ${defaultProps.user.lastName}`;
    expect(fullNameItem.text()).toEqual(fullName);

    const rolesItem = findP('user-item-roles');
    expect(rolesItem.find('span')).toHaveLength(2);
    expect(rolesItem.find('span').at(0).text()).toEqual(ROLE_EDIT);
    expect(rolesItem.find('span').at(1).text()).toEqual(ROLE_ADMIN);

    expect(component.find('AnimateHeight').props()).toEqual(expect.objectContaining({
        duration: 500,
        height: isExpanded ? 'auto' : 0
    }));

    expect(component.find('Button[data-name="user-item-edit-btn"]').text()).toEqual('Edit');
};

describe('UserListItem', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('rendering', () => {
        it('renders without expanded', () => {
            const { component } = mounter();
            testRendering(component);
        });

        it('renders with expanded', () => {
            const { component } = mounter({
                props: {
                    ...defaultProps,
                    user: {
                        ...defaultProps.user,
                        expanded: true
                    }
                }
            });
            testRendering(component, { isExpanded: true });
        });
    });

    describe('callbacks', () => {
        it('calls changeExpanded when not expanded', () => {
            const { component } = mounter();
            component.find('div[data-name="user-list-item-root"]').simulate('click');
            expect(changeExpanded).toHaveBeenCalledWith(defaultProps.user.userId);
        });

        it('does not call changeExpanded when expanded', () => {
            const { component } = mounter({
                props: {
                    ...defaultProps,
                    user: {
                        ...defaultProps.user,
                        expanded: true
                    }
                }
            });
            component.find('div[data-name="user-list-item-root"]').simulate('click');
            expect(changeExpanded).not.toHaveBeenCalled();
        });
    });
});
