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
import Modal from 'components/UI/Modal/Modal';
import { mount } from 'enzyme';
import createMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const closeFn = jest.fn();
const store = createMockStore()({});

describe('Modal component', () => {
	it('renders correctly', () => {
		const title = 'Test Modal';
		const bodyText = 'Hello World';
		const id = 'id';
		const modalBtns = [
			{
				color: 'primary',
				text: 'MyBtn',
				onClick: jest.fn(),
				closeModal: true
			}
		];

		const component = mount(
			<Modal
				id={id}
				open
				close={closeFn}
				title={title}
				modalBtns={modalBtns}
			>
				<p>{bodyText}</p>
			</Modal>
		);

		expect(component.find('Modal').at(0).props().id).toEqual(id);
		expect(component.find('h5.modal-title').text()).toEqual(title);
		expect(component.find('div.modal-body > p').text()).toEqual(bodyText);
		component.find('button.close[type="button"]').simulate('click');
		expect(closeFn).toHaveBeenCalledTimes(1);

		const button = component.find('div.modal-footer > Button').at(0);
		expect(button.text()).toEqual(modalBtns[0].text);
		expect(button.props()).toEqual(
			expect.objectContaining({
				color: modalBtns[0].color
			})
		);
		button.simulate('click');
		expect(modalBtns[0].onClick).toHaveBeenCalledTimes(1);
		expect(closeFn).toHaveBeenCalledTimes(2);

		expect(component.find('form')).toHaveLength(0);
	});

	it('renders with form', () => {
		const handleSubmit = jest.fn();
		const component = mount(
			<Provider store={store}>
				<Modal
					open
					close={closeFn}
					form={{
						name: 'TestForm',
						handleSubmit
					}}
				>
					<p>Hello World</p>
				</Modal>
			</Provider>
		);

		const form = component.find('form');

		expect(form).toHaveLength(1);
		form.simulate('submit');
		expect(handleSubmit).toHaveBeenCalled();
	});
});
