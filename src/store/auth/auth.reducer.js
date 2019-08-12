import { createReducer } from 'redux-starter-kit';
import { setIsAuth } from './auth.actions';

export const initialState = {
    isAuth: false
};

const handleSetIsAuth = (state, action) => ({
    ...state,
    isAuth: action.payload
});

export default createReducer(initialState, {
    [setIsAuth]: handleSetIsAuth
});