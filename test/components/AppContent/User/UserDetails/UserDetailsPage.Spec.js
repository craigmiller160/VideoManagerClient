import UserDetailsPage, { USER_DETAILS_FORM_NAME } from 'components/AppContent/User/UserDetails/UserDetailsPage';
import mountTestComponent from '../../../../exclude/testUtil/mountTestComponent';
import { ROLE_ADMIN } from '../../../../../src/utils/securityConstants';

const defaultProps = {
    pageTitle: 'pageTitle',
    loading: false,
    saveUser: jest.fn(),
    userDetails: {
        userId: 1
    },
    enableUsername: true,
    requirePassword: false,
    roles: [
        { roleId: 1, name: ROLE_ADMIN }
    ],
    revokeUser: jest.fn(),
    deleteUser: jest.fn()
};

const defaultStoreState = {
    form: {
        [USER_DETAILS_FORM_NAME]: {}
    }
};

const doMount = mountTestComponent(UserDetailsPage, {
    defaultProps,
    defaultStoreState
});

const testRendering = (component, {
    loading = false,
    enableUsername = true,
    requirePassword = false,
    disableRoles = false,
    showRevokeUser = true,
    showDeleteUser = true,
    disableSave = false
} = {}) => {
    expect(component.find('h3#user-details-title').text()).toEqual(defaultProps.pageTitle);

    if (loading) {
        expect(component.find('Spinner#user-details-spinner')).toHaveLength(1);
        expect(component.find('Form')).toHaveLength(0);
        return;
    }

    expect(component.find('Spinner')).toHaveLength(0);
    expect(component.find('Form')).toHaveLength(1);
    expect(component.find('Form').props()).toEqual(expect.objectContaining({
        form: USER_DETAILS_FORM_NAME,
        onSubmit: expect.any(Function),
        className: 'UserDetailsForm',
        initialValues: defaultProps.userDetails
    }));

    expect(component.find('InputComponent')).toHaveLength(5);

    const testField = (name, props) => {
        const field = component.find(`Field[name="${name}"]`);
        expect(field).toHaveLength(2);
        expect(field.at(0).props()).toEqual(expect.objectContaining(props));
    };

    testField('userName', {
        label: 'Username',
        name: 'userName',
        type: 'email',
        disabled: !enableUsername,
        divClassName: 'Input',
        validate: [expect.any(Function)]
    });

    testField('password', {
        label: 'Password',
        name: 'password',
        type: 'password',
        divClassName: 'Input',
        validate: requirePassword ? [expect.any(Function)] : []
    });

    testField('firstName', {
        label: 'First Name',
        name: 'firstName',
        type: 'text',
        divClassName: 'Input',
        validate: [expect.any(Function)]
    });

    testField('lastName', {
        label: 'Last Name',
        name: 'lastName',
        type: 'text',
        divClassName: 'Input',
        validate: [expect.any(Function)]
    });

    testField('lastAuthenticated', {
        label: 'Last Authenticated',
        name: 'lastAuthenticated',
        type: 'text',
        divClassName: 'Input',
        disabled: true
    });

    expect(component.find('SelectComponent')).toHaveLength(1);
    testField('roles', {
        label: 'Roles',
        name: 'roles',
        divClassName: 'Input',
        multi: true,
        disabled: disableRoles,
        options: disableRoles ? undefined : defaultProps.roles
    });

    const saveBtn = component.find('Button#user-details-save');
    expect(saveBtn).toHaveLength(1);
    expect(saveBtn.props()).toEqual(expect.objectContaining({
        id: 'user-details-save',
        type: 'submit',
        color: 'primary',
        disabled: disableSave
    }));
    expect(saveBtn.text()).toEqual('Save Changes');

    let buttonCount = 1;
    if (showRevokeUser) {
        buttonCount++;
        const revokeBtn = component.find('Button#user-details-revoke');
        expect(revokeBtn.props()).toEqual(expect.objectContaining({
            id: 'user-details-revoke',
            type: 'button',
            color: 'info',
            onClick: expect.any(Function)
        }));
        expect(revokeBtn.text()).toEqual('Revoke Login');
    }
    if (showDeleteUser) {
        buttonCount++;
        const deleteBtn = component.find('Button#user-details-delete');
        expect(deleteBtn.props()).toEqual(expect.objectContaining({
            id: 'user-details-delete',
            type: 'button',
            color: 'danger',
            onClick: expect.any(Function)
        }));
        expect(deleteBtn.text()).toEqual('Delete User');
    }

    expect(component.find('Button')).toHaveLength(buttonCount);
};

describe('UserDetailsPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('rendering', () => {
        it('renders while loading', () => {
            const { component } = doMount({
                props: {
                    ...defaultProps,
                    loading: true
                }
            });
            testRendering(component, {
                loading: true
            });
        });

        it('renders after loading', () => {
            const { component } = doMount();
            testRendering(component);
        });

        it('renders with password validation', () => {
            const { component } = doMount({
                props: {
                    requirePassword: true
                }
            });
            testRendering(component, {
                requirePassword: true
            });
        });

        it('renders with roles disabled', () => {
            const { component } = doMount({
                props: {
                    ...defaultProps,
                    roles: undefined
                }
            });
            testRendering(component, {
                disableRoles: true
            });
        });

        it('renders with save disabled', () => {
            const { component } = doMount({
                storeState: {
                    ...defaultStoreState,
                    form: {
                        ...defaultStoreState.form,
                        [USER_DETAILS_FORM_NAME]: {
                            syncErrors: {
                                userName: {}
                            }
                        }
                    }
                }
            });
            testRendering(component, {
                disableSave: true
            });
        });

        it('renders without revoke user button', () => {
            const { component } = doMount({
                props: {
                    ...defaultProps,
                    revokeUser: undefined
                }
            });
            testRendering(component, {
                showRevokeUser: false
            });
        });

        it('renders without delete user button', () => {
            const { component } = doMount({
                props: {
                    ...defaultProps,
                    deleteUser: undefined
                }
            });
            testRendering(component, {
                showDeleteUser: false
            });
        });

        it('renders with username disabled', () => {
            const { component } = doMount({
                props: {
                    ...defaultProps,
                    enableUsername: false
                }
            });
            testRendering(component, {
                enableUsername: false
            });
        });
    });

    describe('actions and callbacks', () => {
        it('calls saveUser', () => {
            const { component } = doMount();
            component.find('Button#user-details-save').simulate('submit');
            expect(defaultProps.saveUser).toHaveBeenCalled();
        });

        it('calls revokeUser', () => {
            const { component } = doMount();
            component.find('Button#user-details-revoke').simulate('click');
            expect(defaultProps.revokeUser).toHaveBeenCalled();
        });

        it('calls deleteUser', () => {
            const { component } = doMount();
            component.find('Button#user-details-delete').simulate('click');
            expect(defaultProps.deleteUser).toHaveBeenCalled();
        });
    });
});
