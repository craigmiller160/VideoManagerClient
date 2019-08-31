import { createAction } from 'redux-starter-kit';
import * as AuthService from 'services/AuthApiService';
import { TOKEN_KEY } from '../../utils/securityConstants';
import { showErrorAlert } from '../alert/alert.actions';

export const setIsAuth = createAction('auth/setIsAuth');

export const setLoginLoading = createAction('auth/setLoginLoading');

export const checkAuth = () => async (dispatch) => {
    try {
        await AuthService.checkAuth();
        dispatch(setIsAuth(true));
        return true;
    }
    catch (ex) {
        dispatch(setIsAuth(false));
        return false;
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