import { createAction } from 'redux-starter-kit';

export const handleApiError = (ex, description = '') => (dispatch) => {
    const space = description ? ' ' : '';
    if (ex.response?.data) {
        const message = ex.response.data?.message || ex.response.data;
        const status = ex.response.status;
        dispatch(showErrorAlert(`Error. ${description}${space}Status: ${status} Message: ${message}`));
    } else {
        dispatch(showErrorAlert(`Error: ${description}${space}Message: ${ex.message}`));
    }
};

export const showErrorAlert = createAction('alert/showErrorAlert');
export const showSuccessAlert = createAction('alert/showSuccessAlert');
export const hideAlert = createAction('alert/hideAlert');
