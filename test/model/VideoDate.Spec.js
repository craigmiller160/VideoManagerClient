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

import VideoDate from 'model/VideoDate';

describe('VideoDate', () => {
    it('test moment instance', () => {
        const dateString = '2019-01-01 01:00';
        const date = new VideoDate('2019-01-01T01:00:00');
        expect(date.getDate().format('YYYY-MM-DD HH:mm')).toEqual(dateString);
    });

    it('test date time format', () => {
        const dateString = '2019-01-01 01:00 am';
        const date = new VideoDate('2019-01-01T01:00:00');
        expect(date.formatDateTime()).toEqual(dateString);
    });
});