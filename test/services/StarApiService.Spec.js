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

import StarApiService from '../../src/services/StarApiService';
import API from '../../src/services/API';
import MockAdapter from 'axios-mock-adapter';
import { BASE_STARS, NEW_STAR } from '../exclude/mock/mockData/starData';
import { mockAddNewStar, mockDeleteStar, mockGetAllStars, mockUpdateStar } from '../exclude/mock/mockApiConfig/starApi';

const mockApi = new MockAdapter(API);

beforeEach(() => {
    mockApi.reset();
    mockGetAllStars(mockApi);
    mockAddNewStar(mockApi);
    mockUpdateStar(mockApi);
    mockDeleteStar(mockApi);
});

describe('StarApiService', () => {
    it('Get All Stars', async () => {
        try {
            const result = await StarApiService.getAllStars();
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(BASE_STARS);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });

    it('Add Star', async () => {
        try {
            const result = await StarApiService.addStar(NEW_STAR);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_STAR);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });

    it('Update Star', async () => {
        try {
            const result = await StarApiService.updateStar(3, NEW_STAR);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_STAR);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });

    it('Delete Star', async () => {
        try {
            const result = await StarApiService.deleteStar(3);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_STAR);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });
});