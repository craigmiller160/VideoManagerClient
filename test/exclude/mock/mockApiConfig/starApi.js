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

import { BASE_STARS, NEW_STAR } from '../mockData/starData';

export const mockGetAllStars = (mockApi) => {
    mockApi.onGet('/stars')
        .reply(200, BASE_STARS);
};

export const mockAddNewStar = (mockApi) => {
    mockApi.onPost('/stars', NEW_STAR)
        .reply(200, NEW_STAR);
};

export const mockUpdateStar = (mockApi) => {
    mockApi.onPut('/stars/3', NEW_STAR)
        .reply(200, NEW_STAR);
};

export const mockDeleteStar = (mockApi) => {
    mockApi.onDelete('/stars/3')
        .reply(200, NEW_STAR);
};