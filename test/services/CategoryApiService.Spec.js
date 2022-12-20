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

import CategoryApiService from 'services/CategoryApiService';
import API from 'services/API';
import MockAdapter from 'axios-mock-adapter';
import {
	BASE_CATEGORIES,
	NEW_CATEGORY
} from '../exclude/mock/mockData/categoryData';
import {
	mockAddNewCategory,
	mockDeleteCategory,
	mockGetAllCategories,
	mockUpdateCategory
} from '../exclude/mock/mockApiConfig/categoryApi';
import { mockCsrfPreflight } from '@craigmiller160/ajax-api/lib/test-utils';

const mockApi = new MockAdapter(API.instance);

beforeEach(() => {
	mockApi.reset();
	mockGetAllCategories(mockApi);
	mockAddNewCategory(mockApi);
	mockUpdateCategory(mockApi);
	mockDeleteCategory(mockApi);
});

describe('CategoryApiService', () => {
	it('Get All Categories', async () => {
		try {
			const result = await CategoryApiService.getAllCategories();
			expect(result.status).toEqual(200);
			expect(result.data).toEqual(BASE_CATEGORIES);
		} catch (ex) {
			expect(ex).toBeUndefined();
		}
	});

	it('Add Category', async () => {
		mockCsrfPreflight(mockApi, '/categories');
		try {
			const result = await CategoryApiService.addCategory(NEW_CATEGORY);
			expect(result.status).toEqual(200);
			expect(result.data).toEqual(NEW_CATEGORY);
		} catch (ex) {
			expect(ex).toBeUndefined();
		}
	});

	it('Update Category', async () => {
		mockCsrfPreflight(mockApi, '/categories/3');
		try {
			const result = await CategoryApiService.updateCategory(
				3,
				NEW_CATEGORY
			);
			expect(result.status).toEqual(200);
			expect(result.data).toEqual(NEW_CATEGORY);
		} catch (ex) {
			expect(ex).toBeUndefined();
		}
	});

	it('Delete Category', async () => {
		mockCsrfPreflight(mockApi, '/categories/3');
		try {
			const result = await CategoryApiService.deleteCategory(3);
			expect(result.status).toEqual(200);
			expect(result.data).toEqual(NEW_CATEGORY);
		} catch (ex) {
			expect(ex).toBeUndefined();
		}
	});
});
