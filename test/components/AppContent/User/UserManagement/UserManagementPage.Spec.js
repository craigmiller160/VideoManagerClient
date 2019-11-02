import API from 'services/API';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import UserManagementPage from 'components/AppContent/User/Management/UserManagementPage';
import mountTestComponent from '../../../../exclude/testUtil/mountTestComponent';
import resolveComponent from '../../../../exclude/testUtil/resolveComponent';

// TODO might be a useful bit of code for the future
const doImmediate = (action) => new Promise((resolve) => {
    setImmediate(() => {
        action();
        resolve();
    });
});

const defaultProps = {
    history: {
        push: jest.fn()
    }
};

const doMount = mountTestComponent(UserManagementPage, {
    defaultProps,
    defaultInitialRouterEntries: ['/']
});

const users = [
    {
        userId: 3,
        userName: 'user3',
        roles: []
    },
    {
        userId: 1,
        userName: 'user1',
        roles: []
    },
    {
        userId: 4,
        userName: 'user4',
        roles: []
    },
    {
        userId: 2,
        userName: 'user2',
        roles: []
    }
];

const mockApi = new MockAdapter(API);

describe('UserManagementPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockApi.reset();
        mockApi.onGet('/api/auth/users')
            .reply(200, users);
    });

    describe('rendering', () => {
        it('renders all users', async () => {
            const { component } = doMount();
            await act(async () => {
                await resolveComponent(component);
                component.update();
            });

            console.log(component.debug()); // TODO delete this
        });
    });

    describe('callbacks and actions', () => {
        it('calls history.push when clicking add button', () => {
            throw new Error('Finish this');
        });

        it('updates state in changeExpanded', () => {
            throw new Error('Finish this');
        });

        it('dispatches an error if API call fails', () => {
            throw new Error('Finish this');
        });
    });
});
