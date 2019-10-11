import { createReducer } from 'redux-starter-kit';
import { setCsrfToken, setIsAuth, setLoginLoading, setUserDetails } from './auth.actions';

export const initialState = {
    isAuth: false,
    loginLoading: false,
    csrfToken: null,
    userDetails: {}
};

const handleSetIsAuth = (state, action) => ({
    ...state,
    isAuth: action.payload
});

const handleSetLoginLoading = (state, action) => ({
    ...state,
    loginLoading: action.payload
});

const handleSetCsrfToken = (state, action) => ({
    ...state,
    csrfToken: action.payload
});

const handleSetUserDetails = (state, action) => ({
    ...state,
    userDetails: action.payload ?? {}
});

export default createReducer(initialState, {
    [setIsAuth]: handleSetIsAuth,
    [setLoginLoading]: handleSetLoginLoading,
    [setCsrfToken]: handleSetCsrfToken,
    [setUserDetails]: handleSetUserDetails
});