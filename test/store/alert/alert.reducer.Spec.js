import alertReducer, { initialState as alertInitialState } from 'store/alert/alert.reducer';
import { hideAlert, showErrorAlert, showSuccessAlert } from 'store/alert/alert.actions';

describe('alert.reducer', () => {
    const MESSAGE = 'Hello World';

    it('should return initial state', () => {
        expect(alertReducer(undefined, {})).toEqual(alertInitialState);
    });

    it('should handle showErrorAlert', () => {
        const action = { type: showErrorAlert.toString(), payload: MESSAGE };
        const expectedState = {
            color: 'danger',
            message: MESSAGE,
            show: true
        };
        expect(alertReducer(undefined, action)).toEqual(expectedState);
    });

    it('should handle showSuccessAlert', () => {
        const action = { type: showSuccessAlert.toString(), payload: MESSAGE };
        const expectedState = {
            color: 'success',
            message: MESSAGE,
            show: true
        };
        expect(alertReducer(undefined, action)).toEqual(expectedState);
    });

    it('should handle hideAlert', () => {
        const action = { type: hideAlert.toString() };
        const expectedState = {
            ...alertInitialState,
            show: false
        };
        expect(alertReducer(undefined, action)).toEqual(expectedState);
    });
});