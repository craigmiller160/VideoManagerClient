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

import { BASE_CATEGORIES, NEW_CATEGORY } from '../mockData/categoryData';

export const mockGetAllCategories = (mockApi) => {
	mockApi.onGet('/categories').reply(200, BASE_CATEGORIES);
};

export const mockAddNewCategory = (mockApi) => {
	mockApi.onPost('/categories', NEW_CATEGORY).reply(200, NEW_CATEGORY);
};

export const mockUpdateCategory = (mockApi) => {
	mockApi.onPut('/categories/3', NEW_CATEGORY).reply(200, NEW_CATEGORY);
};

export const mockDeleteCategory = (mockApi) => {
	mockApi.onDelete('/categories/3').reply(200, NEW_CATEGORY);
};
