import { createReducer } from 'redux-starter-kit';
import { setLoading } from './settings.actions';

const intialState = {
    loading: false
};

const handleSetLoading = (state, action) => ({
    ...state,
    loading: action.payload
});

export default createReducer(intialState, {
    [setLoading]: handleSetLoading
});
