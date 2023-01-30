/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import { mount } from 'enzyme';

const createRouter = (initialRouterEntries) => {
	const { MemoryRouter } = require('react-router');
	const Router = (props) => (
		<MemoryRouter initialEntries={initialRouterEntries}>
			{props.children}
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
		<Provider store={store}>{props.children}</Provider>
	);

	return [ReduxProvider, store];
};

const createContext = (ContextType, contextValue) => {
	const TestContext = (props) => (
		<ContextType.Provider value={contextValue}>
			{props.children}
		</ContextType.Provider>
	);

	return TestContext;
};

// defaultProps and defaultStoreState can have individual properties overridden, defaultInitialRouteEntries gets overridden in its entirety
const creator = (
	Component,
	{
		defaultProps,
		defaultStoreState,
		ContextType,
		defaultContextValue,
		defaultInitialRouterEntries,
		defaultUseThunk
	} = {}
) => {
	return ({
		props,
		storeState,
		initialRouterEntries,
		contextValue,
		useThunk
	} = {}) => {
		const actualProps = { ...defaultProps, ...props };

		let TestProviderWrapper = (props) => <div>{props.children}</div>;
		let store = {};
		if (defaultStoreState || storeState) {
			const providerAndStore = createProvider(
				{ ...defaultStoreState, ...storeState },
				useThunk || defaultUseThunk
			);
			TestProviderWrapper = providerAndStore[0];
			store = providerAndStore[1];
		}

		let TestRouterWrapper = (props) => <div>{props.children}</div>;
		if (defaultInitialRouterEntries || initialRouterEntries) {
			TestRouterWrapper = createRouter(
				initialRouterEntries || defaultInitialRouterEntries || []
			);
		}

		let TestContextWrapper = (props) => <div>{props.children}</div>;
		if (ContextType && (defaultContextValue || contextValue)) {
			TestContextWrapper = createContext(
				ContextType,
				contextValue || defaultContextValue
			);
		}

		const component = mount(
			<TestProviderWrapper>
				<TestRouterWrapper>
					<TestContextWrapper>
						<Component {...actualProps} />
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
