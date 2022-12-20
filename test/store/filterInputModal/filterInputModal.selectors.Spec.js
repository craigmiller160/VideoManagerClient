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

import { initialState as videoSearchInitState } from 'store/videoSearch/videoSearch.reducer';
import {
	CATEGORY_TYPE,
	SERIES_TYPE,
	STAR_TYPE
} from 'store/filterInputModal/filterInputModal.constants';
import { initialState as filterInputInitState } from 'store/filterInputModal/filterInputModal.reducer';
import { getSelectedFilter } from 'store/filterInputModal/filterInputModal.selectors';

const category = { value: 1, label: 'Cat1' };
const series = { value: 1, label: 'Series1' };
const star = { value: 1, label: 'Star1' };

describe('filterInputModal.selectors', () => {
	let state;

	beforeEach(() => {
		state = {
			videoSearch: {
				...videoSearchInitState,
				filters: {
					...videoSearchInitState.filters,
					categories:
						videoSearchInitState.filters.categories.concat(
							category
						),
					series: videoSearchInitState.filters.series.concat(series),
					stars: videoSearchInitState.filters.stars.concat(star)
				}
			},
			filterInputModal: filterInputInitState
		};
		state.filterInputModal.index = 0;
	});

	describe('getSelectedFilter', () => {
		it('returns default if no type', () => {
			state.filterInputModal.type = null;
			const result = getSelectedFilter(state);
			expect(result).toEqual({});
		});

		it('throws exception if invalid type', () => {
			state.filterInputModal.type = 'abc';
			try {
				getSelectedFilter(state);
			} catch (ex) {
				expect(ex.message).toContain('Invalid filter type');
				return;
			}
			throw new Error('Should have thrown exception');
		});

		it('gets selected category', () => {
			state.filterInputModal.type = CATEGORY_TYPE;
			const result = getSelectedFilter(state);
			expect(result).toEqual(category);
		});

		it('gets selected series', () => {
			state.filterInputModal.type = SERIES_TYPE;
			const result = getSelectedFilter(state);
			expect(result).toEqual(series);
		});

		it('gets selected star', () => {
			state.filterInputModal.type = STAR_TYPE;
			const result = getSelectedFilter(state);
			expect(result).toEqual(star);
		});
	});
});
