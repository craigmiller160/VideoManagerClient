import { isRequired } from 'utils/validations';

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
});