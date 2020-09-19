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

export const BASE_SERIES = [
    { seriesId: 1, seriesName: 'FirstSeries' },
    { seriesId: 2, seriesName: 'SecondSeries' }
];

export const BASE_SERIES_FILTERS = [
    { value: 1, label: 'FirstSeries' },
    { value: 2, label: 'SecondSeries' }
];

export const NEW_SERIES = { seriesId: 3, seriesName: 'ThirdSeries' };
export const NEW_SERIES_FILTER = { value: NEW_SERIES.seriesId, label: NEW_SERIES.seriesName };