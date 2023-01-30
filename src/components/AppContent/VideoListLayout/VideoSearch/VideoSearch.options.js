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

const convertToOptions = (array) =>
	array.map((value) => ({ value, label: value }));

export const SORT_BY_NAME = 'Name';
export const SORT_BY_VIEWS = 'Views';
export const SORT_BY_LAST_VIEWED = 'Last Viewed';
export const SORT_BY_FILE_ADDED = 'File Added';
export const SORT_BY_OPTIONS = convertToOptions([
	SORT_BY_FILE_ADDED,
	SORT_BY_LAST_VIEWED,
	SORT_BY_NAME,
	SORT_BY_VIEWS
]);

export const SORT_ASC = 'Ascending';
export const SORT_DESC = 'Descending';
export const SORT_DIR_OPTIONS = convertToOptions([SORT_DESC, SORT_ASC]);
