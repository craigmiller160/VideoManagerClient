import { checkIsScanning, setIsScanning, setScanningError, startFileScan } from '../../../src/store/scanning/scanning.actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import API from '../../../src/services/API';
import { mockIsVideoScanRunning, mockStartVideoScan } from '../../exclude/mock/mockApiConfig/videoFileApi';
import { initialState as scanningInitialState } from '../../../src/store/scanning/scanning.reducer';

const mockStore = configureMockStore([thunk]);
const mockApi = new MockAdapter(API);

describe('scanning.actions', () => {
    describe('setIsScanning action', () => {
        it('creates the action', () => {
            const expectedAction = {
                type: setIsScanning.toString(),
                payload: true
            };
            const action = setIsScanning(true);
            expect(action).toEqual(expectedAction);
        });
    });

    describe('setScanningError action', () => {
        it('creates the action', () => {
            const expectedAction = {
                type: setScanningError.toString(),
                payload: true
            };
            const action = setScanningError(true);
            expect(action).toEqual(expectedAction);
        });
    });

    describe('asynchronous thunk actions', () => {
        let store;
        beforeEach(() => {
            mockApi.reset();
            mockStartVideoScan(mockApi);
            mockIsVideoScanRunning(mockApi);
            store = mockStore({
                scanning: scanningInitialState
            });
        });

        describe('checkIsScanning action', () => {
            it('checks if the scan is running', async () => {
                const expectedActions = [
                    { type: setIsScanning.toString(), payload: true },
                    { type: setScanningError.toString(), payload: false }
                ];

                try {
                    await store.dispatch(checkIsScanning());
                }
                catch (ex) {
                    expect(ex).toBeUndefined();
                }

                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('startFileScan action', () => {
            it('starts the file scan', async () => {
                const expectedActions = [
                    { type: setScanningError.toString(), payload: false },
                    { type: setIsScanning.toString(), payload: true },
                    { type: setScanningError.toString(), payload: false }
                ];

                try {
                    await store.dispatch(startFileScan());
                }
                catch (ex) {
                    expect(ex).toBeUndefined();
                }

                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
});