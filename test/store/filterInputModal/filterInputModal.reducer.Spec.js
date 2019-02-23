import filterInputReducer, {
    ADD_ACTION,
    CATEGORY_TYPE, EDIT_ACTION,
    initialState as filterInputInitState, SERIES_TYPE, STAR_TYPE
} from 'store/filterInputModal/filterInputModal.reducer';
import {
    hideFilterModal,
    showAddCategoryModal,
    showAddSeriesModal,
    showAddStarModal, showEditCategoryModal, showEditSeriesModal, showEditStarModal
} from 'store/filterInputModal/filterInputModal.actions';

describe('filterInputModal.reducer', () => {

    it('should return initial state', () => {
        expect(filterInputReducer(undefined, {})).toEqual(filterInputInitState);
    });

    it('showAddCategoryModal action', () => {
        const expectedState = {
            ...filterInputInitState,
            open: true,
            type: CATEGORY_TYPE,
            action: ADD_ACTION
        };
        const action = { type: showAddCategoryModal.toString() };
        expect(filterInputReducer(filterInputInitState, action)).toEqual(expectedState);
    });

    it('showAddSeriesModal action', () => {
        const expectedState = {
            ...filterInputInitState,
            open: true,
            type: SERIES_TYPE,
            action: ADD_ACTION
        };
        const action = { type: showAddSeriesModal.toString() };
        expect(filterInputReducer(filterInputInitState, action)).toEqual(expectedState);
    });

    it('showAddStarModal action', () => {
        const expectedState = {
            ...filterInputInitState,
            open: true,
            type: STAR_TYPE,
            action: ADD_ACTION
        };
        const action = { type: showAddStarModal.toString() };
        expect(filterInputReducer(filterInputInitState, action)).toEqual(expectedState);
    });

    it('showEditCategoryModal action', () => {
        const expectedState = {
            ...filterInputInitState,
            open: true,
            type: CATEGORY_TYPE,
            action: EDIT_ACTION
        };
        const action = { type: showEditCategoryModal.toString() };
        expect(filterInputReducer(filterInputInitState, action)).toEqual(expectedState);
    });

    it('showEditSeriesModal action', () => {
        const expectedState = {
            ...filterInputInitState,
            open: true,
            type: SERIES_TYPE,
            action: EDIT_ACTION
        };
        const action = { type: showEditSeriesModal.toString() };
        expect(filterInputReducer(filterInputInitState, action)).toEqual(expectedState);
    });

    it('showEditStarModal action', () => {
        const expectedState = {
            ...filterInputInitState,
            open: true,
            type: STAR_TYPE,
            action: EDIT_ACTION
        };
        const action = { type: showEditStarModal.toString() };
        expect(filterInputReducer(filterInputInitState, action)).toEqual(expectedState);
    });

    it('hideFilterModal action', () => {
        const expectedState = {
            ...filterInputInitState,
            open: false,
            type: '',
            action: ''
        };
        const action = { type: hideFilterModal.toString() };
        expect(filterInputReducer(filterInputInitState, action)).toEqual(expectedState);
    });
});