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

import API from './API';

const getAllCategories = () => {
    return API.get({
        uri: '/categories'
    });
};

const addCategory = (category) => {
    return API.post({
        uri: '/categories',
        body: category
    });
};

const updateCategory = (categoryId, category) => {
    return API.put({
        uri: `/categories/${categoryId}`,
        body: category
    });
};

const deleteCategory = (categoryId) => {
    return API.delete({
        uri: `/categories/${categoryId}`
    });
};

export default {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory
}
