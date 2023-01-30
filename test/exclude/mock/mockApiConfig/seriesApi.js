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

import { BASE_SERIES, NEW_SERIES } from '../mockData/seriesData';

export const mockGetAllSeries = (mockApi) => {
	mockApi.onGet('/series').reply(200, BASE_SERIES);
};

export const mockAddNewSeries = (mockApi) => {
	mockApi.onPost('/series', NEW_SERIES).reply(200, NEW_SERIES);
};

export const mockUpdateSeries = (mockApi) => {
	mockApi.onPut('/series/3', NEW_SERIES).reply(200, NEW_SERIES);
};

export const mockDeleteSeries = (mockApi) => {
	mockApi.onDelete('/series/3').reply(200, NEW_SERIES);
};
