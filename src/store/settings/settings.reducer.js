import { createReducer } from 'redux-starter-kit';
import { setLoading } from './settings.actions';

export const initialState = {
    loading: false
};

const handleSetLoading = (state, action) => ({
    ...state,
    loading: action.payload
});

export default createReducer(initialState, {
    [setLoading]: handleSetLoading
});
