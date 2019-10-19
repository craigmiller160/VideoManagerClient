import { createAction } from 'redux-starter-kit';
import * as AuthService from 'services/AuthApiService';
import { CSRF_TOKEN_KEY } from '../../utils/securityConstants';
import { showErrorAlert, showSuccessAlert } from '../alert/alert.actions';

export const setIsAuth = createAction('auth/setIsAuth');
export const setLoginLoading = createAction('auth/setLoginLoading');
export const setCsrfToken = createAction('auth/setCsrfToken');
export const setUserDetails = createAction('auth/setUserDetails');

const formatRoles = (roles) => roles.map((role) => ({ roleId: role.value, name: role.label }));

export const handleCsrfToken = (response) => (dispatch) => {
    const csrfToken = response?.headers?.[CSRF_TOKEN_KEY];
    dispatch(setCsrfToken(csrfToken));
};

export const checkAuth = () => async (dispatch) => {
    try {
        const response = await AuthService.checkAuth();
        dispatch(handleCsrfToken(response));
        dispatch(setIsAuth(true));
        dispatch(setUserDetails(response.data));
    }
    catch (ex) {
        dispatch(handleCsrfToken(ex.response));
        dispatch(setIsAuth(false));
        dispatch(setUserDetails(null));
    }
};

export const login = ({ userName, password }) => async (dispatch) => {
    dispatch(setLoginLoading(true));
    try {
        await AuthService.login(userName, password);
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
    dispatch(setUserDetails(null));
};

export const saveUserProfile = (values) => async (dispatch) => {
    const payload = {
        ...values,
        roles: formatRoles(values.roles)
    };
    delete payload.lastAuthenticated;

    try {
        await AuthService.saveUserProfile(payload);
        await dispatch(checkAuth());
        dispatch(showSuccessAlert('Successfully saved user profile'));
    } catch (ex) {
        dispatch(showErrorAlert(ex.message));
    }
};

export const saveUserAdmin = (userId, values) => async (dispatch) => {
    const payload = {
        ...values,
        roles: formatRoles(values.roles)
    };
    delete payload.lastAuthenticated;

    try {
        await AuthService.saveUserAdmin(userId, payload);

        dispatch(showSuccessAlert('Successfully saved user'));
    } catch (ex) {
        dispatch(showErrorAlert(ex.message));
    }
};
