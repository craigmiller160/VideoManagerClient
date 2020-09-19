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

import { createSelector } from 'redux-starter-kit';
import { LOGIN_FORM_NAME } from '../../components/AppContent/Login/Login';
import { ROLE_ADMIN, ROLE_EDIT, ROLE_SCAN } from '../../utils/securityConstants';

export const loginFormHasErrors = createSelector(
    ['form'],
    (form) => {
        const syncErrors = form?.[LOGIN_FORM_NAME]?.syncErrors ?? {};
        return Object.keys(syncErrors).length > 0;
    }
);

export const hasEditRole = createSelector(
    ['auth.userDetails'],
    (userDetails) => !!userDetails?.roles?.find((role) => role.name === ROLE_EDIT)
);

export const hasAdminRole = createSelector(
    ['auth.userDetails'],
    (userDetails) => !!userDetails?.roles?.find((role) => role.name === ROLE_ADMIN)
);

export const hasScanRole = createSelector(
    ['auth.userDetails'],
    (userDetails) => !!userDetails?.roles?.find((role) => role.name === ROLE_SCAN)
);
