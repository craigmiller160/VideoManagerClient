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