import authReducer, { initialState as authInitState } from 'store/auth/auth.reducer';
import { setIsAuth } from '../../../src/store/auth/auth.actions';

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
});