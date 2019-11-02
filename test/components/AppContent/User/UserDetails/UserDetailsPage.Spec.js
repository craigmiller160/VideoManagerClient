import UserDetailsPage, { USER_DETAILS_FORM_NAME } from 'components/AppContent/User/UserDetails/UserDetailsPage';
import mountTestComponent from '../../../../exclude/testUtil/mountTestComponent';

const defaultProps = {
    pageTitle: 'pageTitle',
    loading: false,
    saveUser: jest.fn(),
    userDetails: {
        userId: 1
    },
    enableUsername: true,
    requirePassword: false
};

const defaultStoreState = {

};

const doMount = mountTestComponent(UserDetailsPage, {
    defaultProps,
    defaultStoreState
});

const testRendering = (component, {
    loading = false,
    enableUsername = true,
    requirePassword = false
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

    const testInput = (name, props) => {
        const field = component.find(`Field[name="${name}"]`);
        expect(field).toHaveLength(2);
        expect(field.at(0).props()).toEqual(expect.objectContaining(props));
    };

    testInput('userName', {
        label: 'Username',
        name: 'userName',
        type: 'email',
        disabled: !enableUsername,
        divClassName: 'Input',
        validate: [expect.any(Function)]
    });

    testInput('password', {
        label: 'Password',
        name: 'password',
        type: 'password',
        divClassName: 'Input',
        validate: requirePassword ? [expect.any(Function)] : []
    });

    testInput('firstName', {
        label: 'First Name',
        name: 'firstName',
        type: 'text',
        divClassName: 'Input',
        validate: [expect.any(Function)]
    });

    testInput('lastName', {
        label: 'Last Name',
        name: 'lastName',
        type: 'text',
        divClassName: 'Input',
        validate: [expect.any(Function)]
    });

    testInput('lastAuthenticated', {
        label: 'Last Authenticated',
        name: 'lastAuthenticated',
        type: 'text',
        divClassName: 'Input',
        disabled: true
    });
};

describe('UserDetailsPage', () => {
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
            const { component } = doMount();
            testRendering(component);
        });

        it('renders with save disabled', () => {
            const { component } = doMount();
            testRendering(component);
        });

        it('renders without revoke user button', () => {
            const { component } = doMount();
            testRendering(component);
        });

        it('renders without delete user button', () => {
            const { component } = doMount();
            testRendering(component);
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
            throw new Error();
        });

        it('calls revokeUser', () => {
            throw new Error();
        });

        it('calls deleteUser', () => {
            throw new Error();
        });
    });
});
