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
        const payload = {
            open: true,
            type: CATEGORY_TYPE
        };
        const expectedState = {
            ...filterInputInitState,
            ...payload
        };
        const action = { type: toggleModal.toString(), payload };
        expect(filterInputReducer(filterInputInitState, action)).toEqual(expectedState);
    });

    it('should handle toggleModal open with series type', () => {
        const payload = {
            open: true,
            type: SERIES_TYPE
        };
        const expectedState = {
            ...filterInputInitState,
            ...payload
        };
        const action = { type: toggleModal.toString(), payload };
        expect(filterInputReducer(filterInputInitState, action)).toEqual(expectedState);
    });

    it('should handle toggleModal open with star type', () => {
        const payload = {
            open: true,
            type: STAR_TYPE
        };
        const expectedState = {
            ...filterInputInitState,
            ...payload
        };
        const action = { type: toggleModal.toString(), payload };
        expect(filterInputReducer(filterInputInitState, action)).toEqual(expectedState);
    });

    it('should handle toggleModal close', () => {
        const payload = {
            open: false
        };
        const action = { type: toggleModal.toString(), payload };
        const newInitState = {
            ...filterInputInitState,
            open: true,
            type: CATEGORY_TYPE
        };
        expect(filterInputReducer(newInitState, action)).toEqual(filterInputInitState);
    });
});