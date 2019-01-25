import { setIsScanning } from '../scanning.actions';

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
});