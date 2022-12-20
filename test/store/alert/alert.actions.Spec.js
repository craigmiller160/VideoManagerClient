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

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
	handleApiError,
	hideAlert,
	showErrorAlert,
	showSuccessAlert
} from 'store/alert/alert.actions';

const mockStore = configureMockStore([thunk]);

describe('alert.actions', () => {
	const MESSAGE = 'Hello World';

	let store;
	beforeEach(() => {
		store = mockStore({});
	});

	describe('showErrorAlert action', () => {
		it('creates the action', () => {
			const expectedAction = {
				type: showErrorAlert.toString(),
				payload: MESSAGE
			};
			const action = showErrorAlert(MESSAGE);
			expect(action).toEqual(expectedAction);
		});
	});

	describe('showSuccessAlert action', () => {
		it('creates the action', () => {
			const expectedAction = {
				type: showSuccessAlert.toString(),
				payload: MESSAGE
			};
			const action = showSuccessAlert(MESSAGE);
			expect(action).toEqual(expectedAction);
		});
	});

	describe('hideAlert action', () => {
		it('creates the action', () => {
			const expectedAction = {
				type: hideAlert.toString()
			};
			const action = hideAlert();
			expect(action).toEqual(expectedAction);
		});
	});

	describe('handleApiError', () => {
		it('dispatches the response.data.message', () => {
			const error = {
				response: {
					data: {
						message: 'The message'
					},
					status: 500
				}
			};
			const expectedActions = [
				{
					type: 'alert/showErrorAlert',
					payload: `Error. Status: ${error.response.status} Message: ${error.response.data.message}`
				}
			];
			store.dispatch(handleApiError(error));
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('dispatches the response.data', () => {
			const error = {
				response: {
					data: 'The message',
					status: 500
				}
			};
			const expectedActions = [
				{
					type: 'alert/showErrorAlert',
					payload: `Error. Status: ${error.response.status} Message: ${error.response.data}`
				}
			];
			store.dispatch(handleApiError(error));
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('dispatches the error message', () => {
			const error = {
				message: 'The message'
			};
			const expectedActions = [
				{
					type: 'alert/showErrorAlert',
					payload: `Error: Message: ${error.message}`
				}
			];
			store.dispatch(handleApiError(error));
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('dispatches error with response and description', () => {
			const description = 'Hello World';
			const error = {
				response: {
					data: {
						message: 'The message'
					},
					status: 500
				}
			};
			const expectedActions = [
				{
					type: 'alert/showErrorAlert',
					payload: `Error. ${description} Status: ${error.response.status} Message: ${error.response.data.message}`
				}
			];
			store.dispatch(handleApiError(error, description));
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('dispatches error without repsonse and description', () => {
			const description = 'Hello World';
			const error = {
				message: 'The message'
			};
			const expectedActions = [
				{
					type: 'alert/showErrorAlert',
					payload: `Error: ${description} Message: ${error.message}`
				}
			];
			store.dispatch(handleApiError(error, description));
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
