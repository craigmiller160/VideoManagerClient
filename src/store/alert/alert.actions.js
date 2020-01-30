import { createAction } from 'redux-starter-kit';

export const handleApiError = (ex, description) => (dispatch) => {
    if (ex.response) {
        const message = ex.response.data.message || ex.response.data;
        const status = ex.response.status;
        dispatch(showErrorAlert(`Error. ${description} Status: ${status} Message: ${message}`));
    } else {
        dispatch(showErrorAlert(`Error: ${description} Message: ${ex.message}`));
    }
};

export const showErrorAlert = createAction('alert/showErrorAlert');
export const showSuccessAlert = createAction('alert/showSuccessAlert');
export const hideAlert = createAction('alert/hideAlert');
