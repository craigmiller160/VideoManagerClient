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

import { formatRoles, formatUser, unFormatRoles } from 'components/AppContent/User/UserDetails/userUtils';

const standardRoles = [
    { roleId: 1, name: 'one' },
    { roleId: 2, name: 'two' }
];

const formattedRoles = [
    { value: 1, label: 'one' },
    { value: 2, label: 'two' }
];

const standardUser = {
    userId: 1,
    userName: 'userName',
    firstName: 'firstName',
    lastName: 'lastName',
    roles: standardRoles
};

const standardTimestamp = '2019-01-01T01:01:01.111';
const formattedTimestamp = '2019-01-01 01:01:01.111';

describe('userUtils', () => {
    it('formatRoles', () => {
        const result = formatRoles(standardRoles);
        expect(result).toEqual(formattedRoles);
    });

    describe('formatUser', () => {
        it('with lastAuthenticated', () => {
            const user = {
                ...standardUser,
                lastAuthenticated: standardTimestamp
            };

            const result = formatUser(user);
            expect(result).toEqual({
                ...standardUser,
                roles: formattedRoles,
                lastAuthenticated: formattedTimestamp
            });
        });

        it('without lastAuthenticated', () => {
            const result = formatUser(standardUser);
            expect(result).toEqual({
                ...standardUser,
                roles: formattedRoles,
                lastAuthenticated: ''
            });
        });
    });

    it('unFormatRoles', () => {
        const result = unFormatRoles(formattedRoles);
        expect(result).toEqual(standardRoles);
    });
});
