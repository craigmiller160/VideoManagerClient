import { createAction } from 'redux-starter-kit';
import * as AuthService from 'services/AuthApiService';

export const setIsAuth = createAction('auth/setIsAuth');

export const checkAuth = () => async (dispatch) => {
    try {
        await AuthService.checkAuth();
        dispatch(setIsAuth(true));
    }
    catch (ex) {
        dispatch(setIsAuth(false));
    }
};