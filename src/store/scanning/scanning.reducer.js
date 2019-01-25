import { setIsScanning } from './scanning.actions';
import { createReducer } from 'redux-starter-kit';

export const initialState = {
    isScanning: false
};

const handleSetIsScanning = (state, action) => ({
    ...state,
    isScanning: action.payload
});

export default createReducer(initialState, {
    [setIsScanning]: handleSetIsScanning
});