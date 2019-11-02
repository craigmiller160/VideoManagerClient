import API from 'services/API';
import MockAdapter from 'axios-mock-adapter';
import UserManagementPage from 'components/AppContent/User/Management/UserManagementPage';
import mountTestComponent from '../../../../exclude/testUtil/mountTestComponent';
import resolveComponent from '../../../../exclude/testUtil/resolveComponent';

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
            await resolveComponent(component);

            expect(component.find('div.title > h3').text()).toEqual('User Management');
            expect(component.find('UserListItem')).toHaveLength(4);

            const testItem = (index, user) => {
                expect(component.find('UserListItem').at(index).props()).toEqual({
                    user: user,
                    changeExpanded: expect.any(Function)
                });
            };

            testItem(0, users[1]);
            testItem(1, users[3]);
            testItem(2, users[0]);
            testItem(3, users[2]);

            expect(component.find('Button#add-user-btn')).toHaveLength(1);
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
