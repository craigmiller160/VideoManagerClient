import UserListItem from 'components/AppContent/User/Management/UserListItem';
import mountTestComponent from '../../../../exclude/testUtil/mountTestComponent';
import { ROLE_ADMIN, ROLE_EDIT } from '../../../../../src/utils/securityConstants';

const changeExpanded = jest.fn();
const defaultProps = {
    user: {
        userId: 1
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

const doMount = mountTestComponent(UserListItem, {
    defaultProps
});

describe('UserListItem', () => {
    describe('rendering', () => {
        it('renders without expanded', () => {
            throw new Error('Finish this');
        });

        it('renders with expanded', () => {
            throw new Error('Finish this');
        });
    });

    describe('callbacks', () => {
        it('calls changeExpanded', () => {
            throw new Error('Finish this');
        });
    });
});
