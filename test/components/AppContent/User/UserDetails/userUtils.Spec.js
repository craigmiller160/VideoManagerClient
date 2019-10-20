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
