import { createAction } from 'redux-starter-kit';

export const showErrorAlert = createAction('alert/showErrorAlert');
export const showSuccessAlert = createAction('alert/showSuccessAlert');
export const hideAlert = createAction('alert/hideAlert');
