import { setIsAuth } from 'store/auth/auth.actions';

describe('auth.actions', () => {
    it('setIsAuth', () => {
        const expectedAction = {
            type: setIsAuth.toString(),
            payload: true
        };
        const action = setIsAuth(true);
        expect(action).toEqual(expectedAction);
    });
});