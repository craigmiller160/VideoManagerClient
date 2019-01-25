import { setIsScanning, setScanningError } from './scanning.actions';
import { createReducer } from 'redux-starter-kit';

export const initialState = {
    isScanning: false,
    scanningError: false
};

const handleSetIsScanning = (state, action) => ({
    ...state,
    isScanning: action.payload
});

const handleSetScanningError = (state, action) => ({
    ...state,
    scanningError: action.payload
});

export default createReducer(initialState, {
    [setIsScanning]: handleSetIsScanning,
    [setScanningError]: handleSetScanningError
});