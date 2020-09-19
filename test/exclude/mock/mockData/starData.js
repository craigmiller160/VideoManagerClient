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

export const BASE_STARS = [
    { starId: 1, starName: 'FirstStar' },
    { starId: 2, starName: 'SecondStar' }
];

export const BASE_STAR_FILTERS = [
    { value: 1, label: 'FirstStar' },
    { value: 2, label: 'SecondStar' }
];

export const NEW_STAR = { starId: 3, starName: 'ThirdStar' };
export const NEW_STAR_FILTER = { value: NEW_STAR.starId, label: NEW_STAR.starName };