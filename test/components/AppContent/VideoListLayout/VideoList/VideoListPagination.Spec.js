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
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import VideoListPagination from 'components/AppContent/VideoListLayout/VideoList/VideoListPagination';

jest.mock('components/UI/Pagination/Pagination', () => {
	const Pagination = () => <div />;
	return Pagination;
});

const mockStore = configureMockStore([thunk]);
const defaultState = {
	videoList: {
		pagination: {
			totalItems: 36,
			itemsPerPage: 10
		},
		currentPage: 1
	}
};

const doMount = (state = defaultState) => {
	const store = mockStore(state);
	const component = mount(
		<Provider store={store}>
			<VideoListPagination />
		</Provider>
	);
	return [component, store];
};

describe('VideoListPagination', () => {
	it('renders with pages', () => {
		const [component] = doMount();
		expect(component.find('Pagination').props()).toEqual(
			expect.objectContaining({
				currentPage: 1,
				totalPages: 4,
				onClick: expect.any(Function)
			})
		);
	});

	it('renders without pages', () => {
		const [component] = doMount({
			...defaultState,
			videoList: {
				...defaultState.videoList,
				pagination: {
					...defaultState.videoList.pagination,
					totalItems: 0
				}
			}
		});
		expect(component.find('Pagination')).toHaveLength(0);
	});
});
