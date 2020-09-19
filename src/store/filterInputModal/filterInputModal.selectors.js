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

import { createSelector } from 'redux-starter-kit';
import { CATEGORY_TYPE, SERIES_TYPE, STAR_TYPE } from './filterInputModal.constants';

export const getSelectedFilter = createSelector(
    [
        'videoSearch.filters',
        'filterInputModal.type',
        'filterInputModal.index'
    ],
    (filters, type, index) => {
        if (!type) {
            return {};
        }

        switch (type) {
            case CATEGORY_TYPE: return filters.categories[index];
            case SERIES_TYPE: return filters.series[index];
            case STAR_TYPE: return filters.stars[index];
            default:
                throw new Error(`Invalid filter type: ${type}`);
        }
    }
);