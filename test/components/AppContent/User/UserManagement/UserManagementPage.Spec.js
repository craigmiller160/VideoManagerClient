import UserManagementPage from 'components/AppContent/User/Management/UserManagementPage';
import mountTestComponent from '../../../../exclude/testUtil/mountTestComponent';

const defaultProps = {
    history: {
        push: jest.fn()
    }
};

const doMount = mountTestComponent(UserManagementPage, {
    defaultProps
});

describe('UserManagementPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('rendering', () => {
        it('renders all users', () => {
            // TODO don't forget about loading users from mock server
            // TODO don't forget about user sorting
            throw new Error('Finish this');
        });
    });

    describe('callbacks and actions', () => {
        it('calls history.push when clicking add button', () => {
            throw new Error('Finish this');
        });

        it('updates state in changeExpanded', () => {
            throw new Error('Finish this');
        });
    });
});
