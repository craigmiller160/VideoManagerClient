import settingsReducer, { initialState as settingsInitState } from 'store/settings/settings.reducer';
import { setLoading } from 'store/settings/settings.actions';

describe('settings.reducer', () => {
    it('should return initial state', () => {
        expect(settingsReducer(undefined, {})).toEqual(settingsInitState);
    });

    it('should handle setLoading', () => {
        const action = {
            type: setLoading.toString(),
            payload: true
        };
        expect(settingsReducer(settingsInitState, action)).toEqual({
            ...settingsInitState,
            loading: true
        });
    });
});
