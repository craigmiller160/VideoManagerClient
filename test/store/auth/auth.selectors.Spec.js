import { LOGIN_FORM_NAME } from 'components/AppContent/Login/Login';
import {
    hasAdmiRole,
    hasEditRole,
    hasScanRole,
    loginFormHasErrors
} from 'store/auth/auth.selectors';
import { ROLE_ADMIN, ROLE_EDIT, ROLE_SCAN } from '../../../src/utils/securityConstants';

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

    describe('hasEditRole', () => {
        it('has the role', () => {
            const state = {
                auth: {
                    userDetails: {
                        roles: [ { name: ROLE_EDIT } ]
                    }
                }
            };
            const result = hasEditRole(state);
            expect(result).toEqual(true);
        });

        it('does not have the role', () => {
            const state = {
                auth: {
                    userDetails: {
                        roles: []
                    }
                }
            };
            const result = hasEditRole(state);
            expect(result).toEqual(false);
        });
    });

    describe('hasAdminRole', () => {
        it('has the role', () => {
            const state = {
                auth: {
                    userDetails: {
                        roles: [ { name: ROLE_ADMIN } ]
                    }
                }
            };
            const result = hasAdmiRole(state);
            expect(result).toEqual(true);
        });

        it('does not have the role', () => {
            const state = {
                auth: {
                    userDetails: {
                        roles: []
                    }
                }
            };
            const result = hasAdmiRole(state);
            expect(result).toEqual(false);
        });
    });

    describe('hasScanRole', () => {
        it('has the role', () => {
            const state = {
                auth: {
                    userDetails: {
                        roles: [ { name: ROLE_SCAN } ]
                    }
                }
            };
            const result = hasScanRole(state);
            expect(result).toEqual(true);
        });

        it('does not have the role', () => {
            const state = {
                auth: {
                    userDetails: {
                        roles: []
                    }
                }
            };
            const result = hasScanRole(state);
            expect(result).toEqual(false);
        });
    });
});
