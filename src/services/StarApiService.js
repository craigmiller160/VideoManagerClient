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

const getAllStars = () => {
    return API.get('/stars');
};

const addStar = (star) => {
    return API.post('/stars', star);
};

const updateStar = (starId, star) => {
    return API.put(`/stars/${starId}`, star);
};

const deleteStar = (starId) => {
    return API.delete(`/stars/${starId}`);
};

export default {
    getAllStars,
    addStar,
    updateStar,
    deleteStar
}