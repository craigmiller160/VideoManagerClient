import React from 'react';
import { mount } from 'enzyme';

const createRouter = (initialRouterEntries) => {
    const { MemoryRouter } = require('react-router');
    const Router = (props) => (
        <MemoryRouter initialEntries={ initialRouterEntries }>
            { props.children }
        </MemoryRouter>
    );

    return Router;
};

const createProvider = (storeState, useThunk) => {
    const { Provider } = require('react-redux');
    const configureMockStore = require('redux-mock-store');

    let middleware = [];
    if (useThunk) {
        const thunk = require('redux-thunk');
        middleware.push(thunk);
    }

    const mockStore = configureMockStore(middleware);
    const store = mockStore(storeState);

    const ReduxProvider = (props) => (
        <Provider store={ store }>
            { props.children }
        </Provider>
    );

    return [ReduxProvider, store];
};

const creator = ({ defaultProps, defaultStoreState, defaultInitialRouterEntries, defaultUseThunk } = {}) => {
    return (Component, { props, storeState, initialRouterEntries, useThunk } = {}) => {
        const actualProps = { ...defaultProps, ...props };

        let Provider = <div />;
        let store = {};
        if (defaultStoreState || storeState) {
            const providerAndStore = createProvider({ ...defaultStoreState, ...storeState });
            Provider = providerAndStore[0];
            store = providerAndStore[1];
        }

        let Router = <div />;
        if (defaultInitialRouterEntries || initialRouterEntries) {
            Router = createRouter(initialRouterEntries);
        }

        const component = mount(
            <Provider>
                <Router>
                    <Component { ...actualProps } />
                </Router>
            </Provider>
        );

        return {
            component,
            store
        };
    };
};

export default creator;