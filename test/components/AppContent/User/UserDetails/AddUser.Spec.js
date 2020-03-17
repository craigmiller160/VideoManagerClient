import API from 'services/API';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import enzymeCreator from 'react-enzyme-utils';
import AddUser from 'components/AppContent/User/UserDetails/AddUser';
import resolveComponent from '../../../../exclude/testUtil/resolveComponent';
import { ROLE_EDIT } from '../../../../../src/utils/securityConstants';

const defaultProps = {
    history: {
        push: jest.fn()
    }
};

const defaultStoreState = {};

const mounter = enzymeCreator({
    component: AddUser,
    props: defaultProps,
    redux: {
        state: defaultStoreState,
        useThunk: true
    }
});

const roles = [
    { roleId: 1, name: ROLE_EDIT }
];

const formattedRoles = roles
    .map((role) => ({ value: role.roleId, label: role.name }));

const mockApi = new MockAdapter(API);

const userDetails = {
    userId: 1
};

const testRendering = (component, { hasError = false } = {}) => {
    const userDetailsPage = component.find('UserDetailsPage');

    expect(userDetailsPage).toHaveLength(1);
    expect(userDetailsPage.props()).toEqual({
        pageTitle: 'Add User',
        roles: hasError ? [] : formattedRoles,
        userDetails: {},
        loading: false,
        saveUser: expect.any(Function),
        enableUsername: true,
        requirePassword: true
    });
};

describe('AddUser', () => {
    beforeEach(() => {
        mockApi.reset();
        jest.clearAllMocks();
    });

    describe('rendering', () => {
        it('renders', async () => {
            mockApi.onGet('/auth/roles')
                .reply(200, roles);
            const { component, store } = mounter();
            await resolveComponent(component);
            testRendering(component);
            expect(store.getActions()).not.toEqual(expect.arrayContaining([
                { type: 'alert/showErrorAlert', payload: expect.any(String) }
            ]));
        });

        it('renders with error', async () => {
            const { component, store } = mounter();
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

    describe('actions', () => {
        describe('save',  () => {
            it('successful', async () => {
                mockApi.onGet('/auth/roles')
                    .reply(200, roles);
                mockApi.onPost('/auth/users')
                    .reply(200, userDetails);
                const { component, store } = mounter();
                await resolveComponent(component);
                await act(async () => {
                    await component.find('UserDetailsPage').props()
                        .saveUser({
                            ...userDetails,
                            roles: formattedRoles
                        });
                });
                expect(store.getActions()).toEqual(expect.arrayContaining([
                    { type: 'alert/showSuccessAlert', payload: 'Successfully created user' }
                ]));
                expect(defaultProps.history.push).toHaveBeenCalledWith('/users/1');
            });

            it('fails', async () => {
                mockApi.onGet('/auth/roles')
                    .reply(200, roles);
                const { component, store } = mounter();
                await resolveComponent(component);
                await act(async () => {
                    await component.find('UserDetailsPage').props()
                        .saveUser({
                            ...userDetails,
                            roles: formattedRoles
                        });
                });
                expect(store.getActions()).toEqual(expect.arrayContaining([
                    { type: 'alert/showErrorAlert', payload: 'Error: Message: Request failed with status code 404' }
                ]));
            });
        });
    });
});
