import {
    checkAuth,
    handleCsrfToken,
    login,
    logout,
    setCsrfToken,
    setIsAuth,
    setLoginLoading, setUserDetails
} from 'store/auth/auth.actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import {
    mockCheckAuthFail,
    mockCheckAuthSuccess,
    mockCsrfToken,
    mockLoginFail,
    mockLoginSuccess,
    mockLogout,
    mockPassword, mockUserDetails,
    mockUserName
} from '../../exclude/mock/mockApiConfig/authApi';
import { showErrorAlert } from 'store/alert/alert.actions';
import { CSRF_TOKEN_KEY } from '../../../src/utils/securityConstants';

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

    it('setCsrfToken', () => {
        const csrfToken = 'csrfToken';
        const expectedAction = {
            type: setCsrfToken.toString(),
            payload: csrfToken
        };
        const action = setCsrfToken(csrfToken);
        expect(action).toEqual(expectedAction);
    });

    it('setUserDetails', () => {
        const expectedAction = {
            type: setUserDetails.toString(),
            payload: mockUserDetails
        };
        const action = setUserDetails(mockUserDetails);
        expect(action).toEqual(expectedAction);
    });

    describe('thunk actions', () => {
        let store;
        beforeEach(() => {
            store = mockStore({});
        });

        describe('handleCsrfToken', () => {
            it('sets token', () => {
                const expectedActions = [
                    { type: setCsrfToken.toString(), payload: mockCsrfToken }
                ];
                const response = {
                    headers: {
                        [CSRF_TOKEN_KEY]: mockCsrfToken
                    }
                };
                store.dispatch(handleCsrfToken(response));
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('checkAuth', () => {
            it('checkAuth is authenticated', async () => {
                mockCheckAuthSuccess(mockApi);
                const expectedActions = [
                    { type: setCsrfToken.toString(), payload: mockCsrfToken },
                    { type: setIsAuth.toString(), payload: true },
                    { type: setUserDetails.toString(), payload: mockUserDetails }
                ];
                await store.dispatch(checkAuth());
                expect(store.getActions()).toEqual(expectedActions);
            });

            it('checkAuth is not authenticated', async () => {
                mockCheckAuthFail(mockApi);
                const expectedActions = [
                    { type: setCsrfToken.toString(), payload: mockCsrfToken },
                    { type: setIsAuth.toString(), payload: false },
                    { type: setUserDetails.toString(), payload: null }
                ];
                await store.dispatch(checkAuth());
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('login', () => {
            it('logs the user in', async () => {
                mockLoginSuccess(mockApi);
                mockCheckAuthSuccess(mockApi);
                const expectedActions = [
                    { type: setLoginLoading.toString(), payload: true },
                    { type: setCsrfToken.toString(), payload: mockCsrfToken },
                    { type: setIsAuth.toString(), payload: true },
                    { type: setUserDetails.toString(), payload: mockUserDetails },
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

        describe('logout', () => {
            it('logs out', async () => {
                mockLogout(mockApi);
                const expectedActions = [
                    { type: setIsAuth.toString(), payload: false },
                    { type: setUserDetails.toString(), payload: null }
                ];
                await store.dispatch(logout());
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('saveUserProfile', () => {
            it('saves user profile', () => {
                throw new Error('Finish this');
            });
        });
    });
});
