import { createAction } from 'redux-starter-kit';

export const showErrorAlert = createAction('filterInputModal/showErrorAlert');
export const showSuccessAlert = createAction('filterInputModal/showSuccessAlert');
export const hideAlert = createAction('filterInputModal/hideAlert');