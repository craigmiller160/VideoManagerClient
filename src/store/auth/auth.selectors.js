import { createSelector } from 'redux-starter-kit';
import { LOGIN_FORM_NAME } from '../../components/AppContent/Login/Login';

export const loginFormHasErrors = createSelector(
    [
        'form'
    ],
    (form) => {
        const syncErrors = form?.[LOGIN_FORM_NAME]?.syncErrors ?? {};
        return Object.keys(syncErrors).length > 0;
    }
);