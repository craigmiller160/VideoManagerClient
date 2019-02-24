import {
    hideFilterModal,
    showAddCategoryModal,
    showAddSeriesModal,
    showAddStarModal, showEditCategoryModal, showEditSeriesModal, showEditStarModal
} from 'store/filterInputModal/filterInputModal.actions';

describe('filterInputModal.actions', () => {
    it('showAddCategoryModal action', () => {
        const expectedAction = { type: showAddCategoryModal.toString() };
        const action = showAddCategoryModal();
        expect(action).toEqual(expectedAction);
    });

    it('showAddSeriesModal action', () => {
        const expectedAction = { type: showAddSeriesModal.toString() };
        const action = showAddSeriesModal();
        expect(action).toEqual(expectedAction);
    });

    it('showAddStarModal action', () => {
        const expectedAction = { type: showAddStarModal.toString() };
        const action = showAddStarModal();
        expect(action).toEqual(expectedAction);
    });

    it('showEditCategoryModal action', () => {
        const expectedAction = { type: showEditCategoryModal.toString() };
        const action = showEditCategoryModal();
        expect(action).toEqual(expectedAction);
    });

    it('showEditSeriesModal action', () => {
        const expectedAction = { type: showEditSeriesModal.toString() };
        const action = showEditSeriesModal();
        expect(action).toEqual(expectedAction);
    });

    it('showEditStarModal action', () => {
        const expectedAction = { type: showEditStarModal.toString() };
        const action = showEditStarModal();
        expect(action).toEqual(expectedAction);
    });

    it('hideFilterModal action', () => {
        const expectedAction = { type: hideFilterModal.toString() };
        const action = hideFilterModal();
        expect(action).toEqual(expectedAction);
    });

    describe('saveFilterChanges action', () => {
        // TODO finish this
    });
});