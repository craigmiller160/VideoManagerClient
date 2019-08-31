import { createAction } from 'redux-starter-kit';
import * as AuthService from 'services/AuthApiService';
import { TOKEN_KEY } from '../../utils/securityConstants';

export const setIsAuth = createAction('auth/setIsAuth');

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

/* eslint-disable */
export const login = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const { username, password } = state?.form?.LoginForm?.values ?? {};
        if (!username || !password) {
            return;
        }

        const result = await AuthService.login();
        localStorage.setItem(TOKEN_KEY, result.data.token);
        dispatch(setIsAuth(true));
    }
    catch (ex) {
        dispatch(setIsAuth(false));
    }
};