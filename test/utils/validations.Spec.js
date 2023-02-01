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

import { isRequired, isValidEmail } from 'utils/validations';

describe('validations', () => {
	describe('isRequired', () => {
		it('passes validation check', () => {
			const result = isRequired('abc');
			expect(result).toBeNull();
		});

		it('fails validation check', () => {
			const result = isRequired(null);
			expect(result).toEqual('Required');
		});
	});

	describe('isValidEmail', () => {
		it('passes validation check', () => {
			const result = isValidEmail('craig@gmail.com');
			expect(result).toEqual(null);
		});

		it('fails validation check', () => {
			const result = isValidEmail('abc');
			expect(result).toEqual('Must be valid email');
		});
	});
});
