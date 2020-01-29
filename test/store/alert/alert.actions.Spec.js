import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { handleApiError, hideAlert, showErrorAlert, showSuccessAlert } from 'store/alert/alert.actions';


const mockStore = configureMockStore([thunk]);

describe('alert.actions', () => {
    const MESSAGE = 'Hello World';

    let store;
    beforeEach(() => {
        store = mockStore({});
    });

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

    describe('handleApiError', () => {
        it('dispatches the response.data.message', () => {
            const error = {
                response: {
                    data: {
                        message: 'The message'
                    }
                }
            };
            const expectedActions = [
                { type: 'alert/showErrorAlert', payload: error.response.data.message }
            ];
            store.dispatch(handleApiError(error));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('dispatches the response.data', () => {
            throw new Error();
        });

        it('dispatches the error message', () => {
            throw new Error();
        });
    });
});