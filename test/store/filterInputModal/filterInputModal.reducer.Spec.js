import filterInputReducer, {
    CATEGORY_TYPE,
    initialState as filterInputInitState, SERIES_TYPE, STAR_TYPE
} from 'store/filterInputModal/filterInputModal.reducer';
import { toggleModal } from 'store/filterInputModal/filterInputModal.actions';

describe('filterInputModal.reducer', () => {

    it('should return initial state', () => {
        expect(filterInputReducer(undefined, {})).toEqual(filterInputInitState);
    });

    it('should handle toggleModal open with category type', () => {
        const expectedState = {
            ...filterInputInitState,
            open: true,
            type: CATEGORY_TYPE
        };
        const action = { type: toggleModal.toString(), payload: CATEGORY_TYPE };
        expect(filterInputReducer(filterInputInitState, action)).toEqual(expectedState);
    });

    it('should handle toggleModal open with series type', () => {
        const expectedState = {
            ...filterInputInitState,
            open: true,
            type: SERIES_TYPE
        };
        const action = { type: toggleModal.toString(), payload: SERIES_TYPE };
        expect(filterInputReducer(filterInputInitState, action)).toEqual(expectedState);
    });

    it('should handle toggleModal open with star type', () => {
        const expectedState = {
            ...filterInputInitState,
            open: true,
            type: STAR_TYPE
        };
        const action = { type: toggleModal.toString(), payload: STAR_TYPE };
        expect(filterInputReducer(filterInputInitState, action)).toEqual(expectedState);
    });

    it('should handle toggleModal close', () => {
        const action = { type: toggleModal.toString(), payload: CATEGORY_TYPE };
        const newInitState = {
            ...filterInputInitState,
            open: true,
            type: CATEGORY_TYPE
        };
        expect(filterInputReducer(newInitState, action)).toEqual(filterInputInitState);
    });
});