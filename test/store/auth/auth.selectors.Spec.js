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

import { LOGIN_FORM_NAME } from 'components/AppContent/Login/Login';
import {
    hasAdminRole,
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
            const result = hasAdminRole(state);
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
            const result = hasAdminRole(state);
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
