import { createAction } from 'redux-starter-kit';
import * as AuthService from 'services/AuthApiService';
import { CSRF_TOKEN_KEY } from '../../utils/securityConstants';
import { showErrorAlert } from '../alert/alert.actions';
import CategoryApiService from '../../services/CategoryApiService';

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
        await AuthService.login(userName, password);
        await CategoryApiService.getAllCategories(); // This is only here because of the weird CSRF token changing behavior of Spring
        await dispatch(checkAuth());
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
    await AuthService.logout();
    dispatch(setIsAuth(false));
};