import { checkIsScanning, setIsScanning, startFileScan } from '../scanning.actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import API from '../../../services/API';
import { mockIsVideoScanRunning, mockStartVideoScan } from '../../../mock/mockApiConfig/videoFileApi';
import { initialState as scanningInitialState } from '../scanning.reducer';

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
                    { type: setIsScanning.toString(), payload: true }
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
                    { type: setIsScanning.toString(), payload: true }
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