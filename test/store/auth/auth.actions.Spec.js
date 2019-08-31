import { checkAuth, login, setIsAuth, setLoginLoading } from 'store/auth/auth.actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import {
    mockCheckAuthFail,
    mockCheckAuthSuccess, mockLoginFail,
    mockLoginSuccess, mockPassword,
    mockUserName
} from '../../exclude/mock/mockApiConfig/authApi';
import { showErrorAlert } from 'store/alert/alert.actions';

const mockStore = configureMockStore([thunk]);
const mockApi = new MockAdapter(API);

describe('auth.actions', () => {
    beforeEach(() => {
        mockApi.reset();
    });

    it('setIsAuth', () => {
        const expectedAction = {
            type: setIsAuth.toString(),
            payload: true
        };
        const action = setIsAuth(true);
        expect(action).toEqual(expectedAction);
    });

    it('setLoginLoading', () => {
        const expectedAction = {
            type: setLoginLoading.toString(),
            payload: true
        };
        const action = setLoginLoading(true);
        expect(action).toEqual(expectedAction);
    });

    describe('thunk actions', () => {
        let store;
        beforeEach(() => {
            store = mockStore({});
        });

        describe('checkAuth', () => {
            it('checkAuth is authenticated', async () => {
                mockCheckAuthSuccess(mockApi);
                const expectedActions = [
                    { type: setIsAuth.toString(), payload: true }
                ];
                const result = await store.dispatch(checkAuth());
                expect(result).toEqual(true);
                expect(store.getActions()).toEqual(expectedActions);
            });

            it('checkAuth is not authenticated', async () => {
                mockCheckAuthFail(mockApi);
                const expectedActions = [
                    { type: setIsAuth.toString(), payload: false }
                ];
                const result = await store.dispatch(checkAuth());
                expect(result).toEqual(false);
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('login', () => {
            it('logs the user in', async () => {
                mockLoginSuccess(mockApi);
                const expectedActions = [
                    { type: setLoginLoading.toString(), payload: true },
                    { type: setIsAuth.toString(), payload: true },
                    { type: setLoginLoading.toString(), payload: false }
                ];
                await store.dispatch(login({ userName: mockUserName, password: mockPassword }));
                expect(store.getActions()).toEqual(expectedActions);
            });

            it('handles invalid login', async () => {
                mockLoginFail(mockApi);
                const expectedActions = [
                    { type: setLoginLoading.toString(), payload: true },
                    { type: setIsAuth.toString(), payload: false },
                    { type: showErrorAlert.toString(), payload: 'Invalid login' },
                    { type: setLoginLoading.toString(), payload: false }
                ];
                await store.dispatch(login({ userName: mockUserName, password: mockPassword }));
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
});