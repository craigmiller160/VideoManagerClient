import { createReducer } from 'redux-starter-kit';
import { toggleModal } from './filterInputModal.actions';

export const CATEGORY_TYPE = 'CATEGORY_TYPE';
export const STAR_TYPE = 'STAR_TYPE';
export const SERIES_TYPE = 'SERIES_TYPE';

export const initialState = {
    open: false,
    type: ''
};

const handleToggleModal = (state, { payload }) => ({
    open: !state.open,
    type: state.open ? '' : payload // If the state is already open, then we're closing the modal now
});

export default createReducer(initialState, {
    [toggleModal]: handleToggleModal
});