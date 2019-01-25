import scanningReducer, { initialState as scanningInitialState } from '../scanning.reducer';
import { setIsScanning, setScanningError } from '../scanning.actions';

describe('scanning.reducer', () => {
    it('should return initial state', () => {
        expect(scanningReducer(undefined, {})).toEqual(scanningInitialState);
    });

    it('should handle setIsScanning', () => {
        const action = { type: setIsScanning.toString(), payload: true };
        const expectedState = { ...scanningInitialState, isScanning: true };
        expect(scanningReducer(undefined, action)).toEqual(expectedState);
    });

    it('should handle setScanningError', () => {
        const action = { type: setScanningError.toString(), payload: true };
        const expectedState = { ...scanningInitialState, scanningError: true };
        expect(scanningReducer(undefined, action)).toEqual(expectedState);
    });
});