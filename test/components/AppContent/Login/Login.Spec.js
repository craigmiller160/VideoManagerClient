import React from 'react';
import { mount } from 'enzyme';
import Login, { LOGIN_FORM_NAME } from 'components/AppContent/Login/Login';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('store/auth/auth.actions', () => ({
    login: (values) => (dispatch) => dispatch({ type: 'Login', payload: values })
}));

const mockStore = configureMockStore([thunk]);

const defaultState = {
    auth: {
        loginLoading: false
    }
};

const doMount = (state = defaultState) => {
    const store = mockStore(state);
    const component = mount(
        <Provider store={ store }>
            <Login />
        </Provider>
    );
    return [component, store];
};

describe('Login', () => {
    it('renders correctly', () => {
        const [component] = doMount();
        expect(component.find('h3#login-title').text()).toEqual('Login');
        expect(component.find('input')).toHaveLength(2);
        expect(component.find('Button').props()).toEqual(expect.objectContaining({
            disabled: false
        }));
        expect(component.find('Spinner')).toHaveLength(0);
    });

    it('disables login button on errors', () => {
        const [component] = doMount({
            ...defaultState,
            form: {
                [LOGIN_FORM_NAME]: {
                    syncErrors: {
                        userName: 'required'
                    }
                }
            }
        });
        expect(component.find('h3#login-title').text()).toEqual('Login');
        expect(component.find('input')).toHaveLength(2);
        expect(component.find('Button').props()).toEqual(expect.objectContaining({
            disabled: true
        }));
    });

    it('submits form', () => {
        const [component, store] = doMount({
            ...defaultState,
            form: {
                [LOGIN_FORM_NAME]: {
                    values: {
                        userName: 'user',
                        password: 'pass'
                    }
                }
            }
        });
        component.find('Form').simulate('submit');
        expect(store.getActions()).toEqual(expect.arrayContaining([
            {
                type: 'Login',
                payload: {
                    userName: 'user',
                    password: 'pass'
                }
            }
        ]));
    });

    it('renders loading for when logging in', () => {
        const [component] = doMount({
            ...defaultState,
            auth: {
                ...defaultState.auth,
                loginLoading: true
            }
        });
        expect(component.find('input')).toHaveLength(0);
        expect(component.find('button')).toHaveLength(0);
        expect(component.find('Spinner#login-spinner')).toHaveLength(1);
    });
});
