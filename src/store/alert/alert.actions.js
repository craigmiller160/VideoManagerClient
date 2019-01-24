import { createAction } from 'redux-starter-kit';

export const showErrorAlert = createAction('showErrorAlert');
export const showSuccessAlert = createAction('showSuccessAlert');
export const hideAlert = createAction('hideAlert');