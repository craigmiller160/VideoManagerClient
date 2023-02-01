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
import { FilterInputModal } from 'components/Modals/FilterInputModal/FilterInputModal';
import {
	ADD_ACTION,
	EDIT_ACTION
} from 'store/filterInputModal/filterInputModal.constants';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const close = jest.fn();
const submit = jest.fn();
const deleteFilter = jest.fn();
const defaultProps = {
	open: true,
	close,
	submit,
	type: 'Category',
	action: ADD_ACTION,
	value: {},
	deleteFilter
};

const doMount = (props = defaultProps) =>
	mount(
		<Provider store={store}>
			<FilterInputModal {...props} />
		</Provider>
	);

describe('FilterInputModal', () => {
	beforeEach(() => {
		submit.mockReset();
		close.mockReset();
		deleteFilter.mockReset();
	});

	it('renders correctly', () => {
		const component = doMount();
		expect(component.find('Modal').at(0).props().id).toEqual(
			'category-filter-input-modal'
		);
		expect(component.find('h5.modal-title').text()).toEqual('Add Category');
		expect(component.find('label').at(0).text()).toEqual('Category Name');
		expect(component.find('Button')).toHaveLength(2);
		expect(component.find('Button').at(0).props()).toEqual(
			expect.objectContaining({
				color: 'success',
				type: 'submit'
			})
		);
		expect(component.find('Button').at(0).find('button').text()).toEqual(
			'Save'
		);
		expect(component.find('Button').at(1).props()).toEqual(
			expect.objectContaining({
				color: 'info',
				type: 'button'
			})
		);
		expect(component.find('Button').at(1).find('button').text()).toEqual(
			'Cancel'
		);
	});

	it('renders correctly when modal is closed', () => {
		const component = doMount({
			...defaultProps,
			open: false
		});
		expect(component.find('h5.modal-title')).toHaveLength(0);
	});

	it('renders special edit action items', () => {
		const value = {
			value: 1,
			label: 'Label1'
		};
		const component = doMount({
			...defaultProps,
			action: EDIT_ACTION,
			value
		});
		expect(component.find('h5.modal-title').text()).toEqual(
			'Edit Category'
		);
		expect(component.find('Button')).toHaveLength(3);
		expect(component.find('Button').at(0).props()).toEqual(
			expect.objectContaining({
				color: 'danger',
				type: 'button'
			})
		);
		expect(component.find('Button').at(0).text()).toEqual('Delete');
		expect(component.find('Form').at(0).props()).toEqual(
			expect.objectContaining({
				initialValues: {
					id: value.value,
					name: value.label
				}
			})
		);
	});

	it('handles save button clicks', () => {
		const component = doMount();
		component.find('Button').at(0).find('button').simulate('click');
		expect(close).toHaveBeenCalled();
		component.find('form').simulate('submit');
		expect(submit).toHaveBeenCalled();
	});

	it('handles cancel button clicks', () => {
		const component = doMount();
		component.find('Button').at(1).find('button').simulate('click');
		expect(close).toHaveBeenCalled();
	});

	it('handles close button clicks', () => {
		const component = doMount();
		component.find('button.close').simulate('click');
		expect(close).toHaveBeenCalled();
	});

	it('calls deleteFilter function', () => {
		const component = doMount({
			...defaultProps,
			action: EDIT_ACTION
		});
		component.find('Button').at(0).find('button').simulate('click');
		expect(deleteFilter).toHaveBeenCalled();
	});
});
