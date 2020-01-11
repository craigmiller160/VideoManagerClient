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
    const configureMockStore = require('redux-mock-store').default;

    let middleware = [];
    if (useThunk) {
        const thunk = require('redux-thunk').default;
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

const createContext = (ContextType, contextValue) => (props) => (
    <ContextType value={ contextValue }>
        { props.children }
    </ContextType>
);

// defaultProps and defaultStoreState can have individual properties overridden, defaultInitialRouteEntries gets overridden in its entirety
const creator = (Component, { defaultProps, defaultStoreState, ContextType, defaultContextValue, defaultInitialRouterEntries, defaultUseThunk } = {}) => {
    return ({ props, storeState, initialRouterEntries, contextValue, useThunk } = {}) => {
        const actualProps = { ...defaultProps, ...props };

        let TestProviderWrapper = (props) => <div>{ props.children }</div>;
        let store = {};
        if (defaultStoreState || storeState) {
            const providerAndStore = createProvider({ ...defaultStoreState, ...storeState }, useThunk || defaultUseThunk);
            TestProviderWrapper = providerAndStore[0];
            store = providerAndStore[1];
        }

        let TestRouterWrapper = (props) => <div>{ props.children }</div>;
        if (defaultInitialRouterEntries || initialRouterEntries) {
            TestRouterWrapper = createRouter(initialRouterEntries || defaultInitialRouterEntries || []);
        }

        let TestContextWrapper = (props) => <div>{ props.children }</div>;
        if (ContextType && (defaultContextValue || contextValue)) {
            TestContextWrapper = createContext(ContextType, (contextValue || defaultContextValue));
        }

        const component = mount(
            <TestProviderWrapper>
                <TestRouterWrapper>
                    <TestContextWrapper>
                        <Component { ...actualProps } />
                    </TestContextWrapper>
                </TestRouterWrapper>
            </TestProviderWrapper>
        );

        return {
            component,
            store
        };
    };
};

export default creator;
