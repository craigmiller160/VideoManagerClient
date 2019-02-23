import { toggleFilterInputModal } from 'store/filterInputModal/filterInputModal.actions';
import { CATEGORY_TYPE, SERIES_TYPE, STAR_TYPE } from 'store/filterInputModal/filterInputModal.reducer';

describe('filterInputModal.actions', () => {
    describe('toggleFilterInputModal action', () => {
        it('creates the action for category modal', () => {
            const expectedAction = {
                type: toggleFilterInputModal.toString(),
                payload: CATEGORY_TYPE
            };
            const action = toggleFilterInputModal(CATEGORY_TYPE);
            expect(action).toEqual(expectedAction);
        });

        it('creates the action for series modal', () => {
            const expectedAction = {
                type: toggleFilterInputModal.toString(),
                payload: SERIES_TYPE
            };
            const action = toggleFilterInputModal(SERIES_TYPE);
            expect(action).toEqual(expectedAction);
        });

        it('creates the action for stars modal', () => {
            const expectedAction = {
                type: toggleFilterInputModal.toString(),
                payload: STAR_TYPE
            };
            const action = toggleFilterInputModal(STAR_TYPE);
            expect(action).toEqual(expectedAction);
        });
    });
});