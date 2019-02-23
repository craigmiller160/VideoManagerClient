import { hideAlert, showErrorAlert, showSuccessAlert } from 'store/alert/alert.actions';

describe('alert.actions', () => {
    const MESSAGE = 'Hello World';

    describe('showErrorAlert action', () => {
        it('creates the action', () => {
            const expectedAction = {
                type: showErrorAlert.toString(),
                payload: MESSAGE
            };
            const action = showErrorAlert(MESSAGE);
            expect(action).toEqual(expectedAction);
        });
    });

    describe('showSuccessAlert action', () => {
        it('creates the action', () => {
            const expectedAction = {
                type: showSuccessAlert.toString(),
                payload: MESSAGE
            };
            const action = showSuccessAlert(MESSAGE);
            expect(action).toEqual(expectedAction);
        });
    });

    describe('hideAlert action', () => {
        it('creates the action', () => {
            const expectedAction = {
                type: hideAlert.toString()
            };
            const action = hideAlert();
            expect(action).toEqual(expectedAction);
        });
    });
});