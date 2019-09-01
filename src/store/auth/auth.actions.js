import { createAction } from 'redux-starter-kit';
import * as AuthService from 'services/AuthApiService';
import { CSRF_TOKEN_KEY, TOKEN_KEY } from '../../utils/securityConstants';
import { showErrorAlert } from '../alert/alert.actions';

export const setIsAuth = createAction('auth/setIsAuth');
export const setLoginLoading = createAction('auth/setLoginLoading');
export const setCsrfToken = createAction('auth/setCsrfToken');

export const handleCsrfToken = (response) => (dispatch) => {
    const csrfToken = response?.headers?.[CSRF_TOKEN_KEY];
    dispatch(setCsrfToken(csrfToken));
};

export const checkAuth = () => async (dispatch) => {
    try {
        const response = await AuthService.checkAuth();
        dispatch(handleCsrfToken(response));
        dispatch(setIsAuth(true));
    }
    catch (ex) {
        dispatch(handleCsrfToken(ex.response));
        dispatch(setIsAuth(false));
    }
};

export const login = ({ userName, password }) => async (dispatch) => {
    dispatch(setLoginLoading(true));
    try {
        const result = await AuthService.login(userName, password);
        localStorage.setItem(TOKEN_KEY, result.data.token);
        dispatch(setIsAuth(true));
    }
    catch (ex) {
        dispatch(setIsAuth(false));
        if (ex?.response?.status === 401) {
            dispatch(showErrorAlert('Invalid login'));
        }
        else {
            dispatch(showErrorAlert(ex.message));
        }
    }
    finally {
        dispatch(setLoginLoading(false));
    }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem(TOKEN_KEY);
    dispatch(setIsAuth(false));
};