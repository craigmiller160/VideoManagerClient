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

import API from './API';

const getAllSeries = () => {
    return API.get({
        uri: '/series'
    });
};

const addSeries = (series) => {
    return API.post({
        uri: '/series',
        body: series
    });
};

const updateSeries = (seriesId, series) => {
    return API.put({
        uri: `/series/${seriesId}`,
        body: series
    });
};

const deleteSeries = (seriesId) => {
    return API.delete({
        uri: `/series/${seriesId}`
    });
};

export default {
    getAllSeries,
    addSeries,
    updateSeries,
    deleteSeries
}
