import API from 'services/API';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import EditUser from 'components/AppContent/User/UserDetails/EditUser';
import mountTestComponent from '../../../../exclude/testUtil/mountTestComponent';
import { ROLE_ADMIN, ROLE_EDIT } from '../../../../../src/utils/securityConstants';
import resolveComponent from '../../../../exclude/testUtil/resolveComponent';

jest.mock('store/auth/auth.actions', () => ({
    checkAuth: () => ({
        type: 'checkAuth'
    })
}));

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
    history: {
        push: jest.fn()
    }
};

const doMount = mountTestComponent(EditUser, {
    defaultProps,
    defaultStoreState: {},
    defaultUseThunk: true
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
                    payload: 'Error: Error loading data for page. Message: Request failed with status code 404'
                }
            ]));
        });
    });

    describe('behavior', () => {
        beforeEach(() => {
            mockApi.onGet('/api/auth/roles')
                .reply(200, roles);
            mockApi.onGet('/api/auth/users/admin/1')
                .reply(200, userDetails);
        });

        it('save', async () => {
            const values = {
                ...userDetails,
                roles: formattedRoles,
                lastAuthenticated: 'abcdefg'
            };
            const formattedValues = {
                ...userDetails,
                roles
            };
            mockApi.onPut('/auth/users/admin/1', formattedValues)
                .reply(200, userDetails);
            const { component, store } = doMount();
            await resolveComponent(component);
            await act(async () => {
                component.find('UserDetailsPage').props().saveUser(values);
            });
            await resolveComponent(component);
            testRendering(component);
            expect(store.getActions()).toEqual(expect.arrayContaining([
                { type: 'checkAuth' },
                { type: 'alert/showSuccessAlert', payload: 'Successfully saved user' }
            ]));
            expect(defaultProps.history.push).toHaveBeenCalledWith('/users');
        });

        it('deleteUser', async () => {
            mockApi.onDelete('/auth/users/1')
                .reply(200);
            const { component, store } = doMount();
            await resolveComponent(component);
            await act(async () => {
                component.find('UserDetailsPage').props().deleteUser();
            });
            expect(store.getActions()).toEqual(expect.arrayContaining([
                { type: 'alert/showSuccessAlert', payload: 'Successfully deleted user' }
            ]));
            expect(defaultProps.history.push).toHaveBeenCalledWith('/users');
        });

        it('revokeUser', async () => {
            mockApi.onPost('/auth/users/revoke/1')
                .reply(200, userDetails);
            const { component, store } = doMount();
            await resolveComponent(component);
            await act(async () => {
                component.find('UserDetailsPage').props().revokeUser();
            });
            await resolveComponent(component);
            testRendering(component);
            expect(store.getActions()).toEqual(expect.arrayContaining([
                { type: 'alert/showSuccessAlert', payload: 'Successfully revoked user login' }
            ]));
        });
    });
});
