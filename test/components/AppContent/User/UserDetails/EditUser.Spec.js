import API from 'services/API';
import MockAdapter from 'axios-mock-adapter';
import EditUser from 'components/AppContent/User/UserDetails/EditUser';
import mountTestComponent from '../../../../exclude/testUtil/mountTestComponent';
import { ROLE_ADMIN, ROLE_EDIT } from '../../../../../src/utils/securityConstants';
import resolveComponent from '../../../../exclude/testUtil/resolveComponent';

const roles = [
    { roleId: 1, name: ROLE_ADMIN },
    { roleId: 2, name: ROLE_EDIT }
];

const formattedRoles = [
    { value: 1, label: ROLE_ADMIN },
    { value: 2, label: ROLE_EDIT }
];

const userDetails = {
    userId: 1
};

const defaultProps = {
    match: {
        params: {
            userId: 1
        }
    },
    history: {}
};

const doMount = mountTestComponent(EditUser, {
    defaultProps,
    defaultStoreState: {}
});

const mockApi = new MockAdapter(API);

const testRendering = (component, { hasError = false } = {}) => {
    const userDetailsPage = component.find('UserDetailsPage');
    expect(userDetailsPage).toHaveLength(1);

    expect(userDetailsPage.props()).toEqual(expect.objectContaining({
        pageTitle: 'Edit User',
        loading: false,
        userDetails: expect.any(Object),
        roles: hasError ? [] : formattedRoles,
        saveUser: expect.any(Function)
    }));
};

describe('EditUser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockApi.reset();
    });

    describe('rendering', () => {
        it('renders', async () => {
            mockApi.onGet('/api/auth/roles')
                .reply(200, roles);
            mockApi.onGet('/api/auth/users/admin/1')
                .reply(200, userDetails);
            const { component, store } = doMount();
            await resolveComponent(component);
            testRendering(component);
            expect(store.getActions()).not.toEqual(expect.arrayContaining([
                { type: 'alert/showErrorAlert', payload: expect.any(String) }
            ]));
        });

        it('renders with error', async () => {
            const { component, store } = doMount();
            await resolveComponent(component);
            testRendering(component, {
                hasError: true
            });
            expect(store.getActions()).toEqual(expect.arrayContaining([
                {
                    type: 'alert/showErrorAlert',
                    payload: 'Error loading data for page: Request failed with status code 404'
                }
            ]));
        });
    });

    describe('behavior', () => {
        it('save', () => {
            throw new Error('Finish this');
        });

        it('deleteUser', () => {
            throw new Error('Finish this');
        });

        it('revokeUser', () => {
            throw new Error('Finish this');
        });
    });
});
