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

import moment from 'moment';

const SERVER_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
const DATE_TIME_FORMAT = 'YYYY-MM-DD hh:mm a';

class VideoDate {
	#date;

	constructor(date) {
		this.#date = moment(date, SERVER_DATE_TIME_FORMAT);
	}

	formatDateTime() {
		return this.#date.format(DATE_TIME_FORMAT);
	}

	getDate() {
		return this.#date;
	}
}

export default VideoDate;
