import { createReducer } from 'redux-starter-kit';
import { setIsAuth, setLoginLoading } from './auth.actions';

export const initialState = {
    isAuth: false,
    loginLoading: false
};

const handleSetIsAuth = (state, action) => ({
    ...state,
    isAuth: action.payload
});

const handleSetLoginLoading = (state, action) => ({
    ...state,
    loginLoading: action.payload
});

export default createReducer(initialState, {
    [setIsAuth]: handleSetIsAuth,
    [setLoginLoading]: handleSetLoginLoading
});