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

export const hasAdmiRole = createSelector(
    ['auth.userDetails'],
    (userDetails) => !!userDetails?.roles?.find((role) => role.name === ROLE_ADMIN)
);

export const hasScanRole = createSelector(
    ['auth.userDetails'],
    (userDetails) => !!userDetails?.roles?.find((role) => role.name === ROLE_SCAN)
);
