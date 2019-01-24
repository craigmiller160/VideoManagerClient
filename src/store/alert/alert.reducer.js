import { createReducer } from "redux-starter-kit";
import { hideAlert, showErrorAlert, showSuccessAlert } from './alert.actions';

export const initialState = {
    color: '',
    message: '',
    show: false
};

const handleShowSuccessAlert = (state, action) => ({
    ...state,
    color: 'success',
    message: action.payload,
    show: true
});

const handleShowErrorAlert = (state, action) => ({
    ...state,
    color: 'danger',
    message: action.payload,
    show: true
});

const handleHideAlert = (state) => ({
    ...state,
    show: false
});

export default createReducer(initialState, {
    [showSuccessAlert]: handleShowSuccessAlert,
    [showErrorAlert]: handleShowErrorAlert,
    [hideAlert]: handleHideAlert
});