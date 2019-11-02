import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
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

const users = [
    {
        userId: 3,
        userName: 'user3'
    },
    {
        userId: 1,
        userName: 'user1'
    },
    {
        userId: 4,
        userName: 'user4'
    },
    {
        userId: 2,
        userName: 'user2'
    }
];

const mockApi = new MockAdapter(axios);

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
                // jest.advanceTimersByTime(100000);
                jest.runAllImmediates();
            });
            component.update();
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
