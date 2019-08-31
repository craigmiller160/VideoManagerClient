import { checkAuth, setIsAuth } from 'store/auth/auth.actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import { mockCheckAuthFail, mockCheckAuthSuccess } from '../../exclude/mock/mockApiConfig/authApi';

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
            it('logs the user in', () => {
                throw new Error('Finish this');
            });
        });
    });
});