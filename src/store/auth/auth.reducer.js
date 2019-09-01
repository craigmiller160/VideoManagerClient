import { createReducer } from 'redux-starter-kit';
import { setCsrfToken, setIsAuth, setLoginLoading } from './auth.actions';

export const initialState = {
    isAuth: false,
    loginLoading: false,
    csrfToken: null
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

export default createReducer(initialState, {
    [setIsAuth]: handleSetIsAuth,
    [setLoginLoading]: handleSetLoginLoading,
    [setCsrfToken]: handleSetCsrfToken
});