import { createAction } from 'redux-starter-kit';

export const handleApiError = (ex) => (dispatch) => {
    if (ex.response) {
        dispatch(showErrorAlert(ex.response.data.message || ex.response.data));
    } else {
        dispatch(showErrorAlert(ex.message));
    }
};

export const showErrorAlert = createAction('alert/showErrorAlert');
export const showSuccessAlert = createAction('alert/showSuccessAlert');
export const hideAlert = createAction('alert/hideAlert');
