import authReducer, { initialState as authInitState } from 'store/auth/auth.reducer';
import { setCsrfToken, setIsAuth, setLoginLoading, setUserDetails } from '../../../src/store/auth/auth.actions';
import { mockCsrfToken, mockUserDetails } from '../../exclude/mock/mockApiConfig/authApi';

describe('auth.reducer', () => {
    it('returns initial state', () => {
        expect(authReducer(undefined, {})).toEqual(authInitState);
    });

    it('handleSetIsAuth', () => {
        const action = { type: setIsAuth.toString(), payload: true };
        const expectedState = {
            ...authInitState,
            isAuth: true
        };
        expect(authReducer(authInitState, action)).toEqual(expectedState);
    });

    it('handleSetLoginLoading', () => {
        const action = { type: setLoginLoading.toString(), payload: true };
        const expectedState = {
            ...authInitState,
            loginLoading: true
        };
        expect(authReducer(authInitState, action)).toEqual(expectedState);
    });

    it('handleSetCsrfToken', () => {
        const action = { type: setCsrfToken.toString(), payload: mockCsrfToken };
        const expectedState = {
            ...authInitState,
            csrfToken: mockCsrfToken
        };
        expect(authReducer(authInitState, action)).toEqual(expectedState);
    });

    it('handleSetUserDetails', () => {
        const action = { type: setUserDetails.toString(), payload: mockUserDetails };
        const expectedState = {
            ...authInitState,
            userDetails: mockUserDetails
        };
        expect(authReducer(authInitState, action)).toEqual(expectedState);
    });
});