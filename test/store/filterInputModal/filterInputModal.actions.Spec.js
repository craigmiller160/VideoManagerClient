import { toggleModal } from 'store/filterInputModal/filterInputModal.actions';
import { CATEGORY_TYPE, SERIES_TYPE, STAR_TYPE } from 'store/filterInputModal/filterInputModal.reducer';

describe('filterInputModal.actions', () => {
    describe('toggleModal action', () => {
        it('creates the action for category modal', () => {
            const expectedAction = {
                type: toggleModal.toString(),
                payload: CATEGORY_TYPE
            };
            const action = toggleModal(CATEGORY_TYPE);
            expect(action).toEqual(expectedAction);
        });

        it('creates the action for series modal', () => {
            const expectedAction = {
                type: toggleModal.toString(),
                payload: SERIES_TYPE
            };
            const action = toggleModal(SERIES_TYPE);
            expect(action).toEqual(expectedAction);
        });

        it('creates the action for stars modal', () => {
            const expectedAction = {
                type: toggleModal.toString(),
                payload: STAR_TYPE
            };
            const action = toggleModal(STAR_TYPE);
            expect(action).toEqual(expectedAction);
        });
    });
});