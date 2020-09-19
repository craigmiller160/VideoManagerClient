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

import videoSearchReducer, { initialState as videoSearchInitState } from '../../../src/store/videoSearch/videoSearch.reducer';
import { setCategories, setSearching, setSeries, setStars } from '../../../src/store/videoSearch/videoSearch.actions';
import { BASE_CATEGORIES } from '../../exclude/mock/mockData/categoryData';
import { BASE_SERIES } from '../../exclude/mock/mockData/seriesData';
import { BASE_STARS } from '../../exclude/mock/mockData/starData';

const cloneState = () => ({
    ...videoSearchInitState,
    filters: {
        ...videoSearchInitState.filters
    }
});

describe('videoSearch.reducer', () => {
    it('should return initial state', () => {
        expect(videoSearchReducer(undefined, {})).toEqual(videoSearchInitState);
    });

    it('should handle setCategories', () => {
        const action = { type: setCategories.toString(), payload: BASE_CATEGORIES };
        const expectedState = cloneState();
        expectedState.filters.categories = BASE_CATEGORIES;
        expect(videoSearchReducer(undefined, action)).toEqual(expectedState);
    });

    it('should handle setSeries', () => {
        const action = { type: setSeries.toString(), payload: BASE_SERIES };
        const expectedState = cloneState();
        expectedState.filters.series = BASE_SERIES;
        expect(videoSearchReducer(undefined, action)).toEqual(expectedState);
    });

    it('should handle setStars', () => {
        const action = { type: setStars.toString(), payload: BASE_STARS };
        const expectedState = cloneState();
        expectedState.filters.stars = BASE_STARS;
        expect(videoSearchReducer(undefined, action)).toEqual(expectedState);
    });

    it('should handle setSearching', () => {
        const action = { type: setSearching.toString(), payload: true };
        const expectedState = {
            ...cloneState(),
            searching: true
        };
        expect(videoSearchReducer(undefined, action)).toEqual(expectedState);
    });
});