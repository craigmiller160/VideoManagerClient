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

import SeriesApiService from '../../src/services/SeriesApiService';
import API from '../../src/services/API';
import MockAdapter from 'axios-mock-adapter';
import { BASE_SERIES, NEW_SERIES } from '../exclude/mock/mockData/seriesData';
import {
    mockAddNewSeries,
    mockDeleteSeries,
    mockGetAllSeries,
    mockUpdateSeries
} from '../exclude/mock/mockApiConfig/seriesApi';
import { mockCsrfOptions } from '../exclude/mock/mockApiConfig/authApi';

const mockApi = new MockAdapter(API.instance);

beforeEach(() => {
    mockApi.reset();
    mockGetAllSeries(mockApi);
    mockAddNewSeries(mockApi);
    mockUpdateSeries(mockApi);
    mockDeleteSeries(mockApi);
});

describe('SeriesApiService', () => {
    it('Get All Series', async () => {
        try {
            const result = await SeriesApiService.getAllSeries();
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(BASE_SERIES);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });

    it('Add Series', async () => {
        mockCsrfOptions(mockApi, '/series');
        try {
            const result = await SeriesApiService.addSeries(NEW_SERIES);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_SERIES);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });

    it('Update Series', async () => {
        mockCsrfOptions(mockApi, '/series/3');
        try {
            const result = await SeriesApiService.updateSeries(3, NEW_SERIES);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_SERIES);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });

    it('Delete Series', async () => {
        mockCsrfOptions(mockApi, '/series/3');
        try {
            const result = await SeriesApiService.deleteSeries(3);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_SERIES);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });
});
