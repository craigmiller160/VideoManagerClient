import { LOGIN_FORM_NAME } from 'components/AppContent/Login/Login';
import { loginFormHasErrors } from 'store/auth/auth.selectors';

describe('auth.selectors', () => {
    describe('loginFormHasErrors', () => {
        it('has errors', () => {
            const state = {
                form: {
                    [LOGIN_FORM_NAME]: {
                        syncErrors: {
                            username: 'Required'
                        }
                    }
                }
            };
            const result = loginFormHasErrors(state);
            expect(result).toEqual(true);
        });

        it('has no errors', () => {
            const state = {
                form: {
                    [LOGIN_FORM_NAME]: {}
                }
            };
            const result = loginFormHasErrors(state);
            expect(result).toEqual(false);
        });
    });
});