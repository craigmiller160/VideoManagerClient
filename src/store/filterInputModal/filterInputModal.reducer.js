import { createReducer } from 'redux-starter-kit';
import {
    hideFilterModal,
    showAddCategoryModal,
    showAddSeriesModal,
    showAddStarModal,
    showEditCategoryModal, showEditSeriesModal, showEditStarModal
} from './filterInputModal.actions';

export const CATEGORY_TYPE = 'Category';
export const STAR_TYPE = 'Star';
export const SERIES_TYPE = 'Series';
export const ADD_ACTION = 'Add';
export const EDIT_ACTION = 'Edit';

export const initialState = {
    open: false,
    type: '',
    action: ''
};

const handleShowAddCategoryModal = (state) => ({
    ...state,
    open: true,
    type: CATEGORY_TYPE,
    action: ADD_ACTION
});

const handleShowAddSeriesModal = (state) => ({
    ...state,
    open: true,
    type: SERIES_TYPE,
    action: ADD_ACTION
});

const handleShowAddStarModal = (state) => ({
    ...state,
    open: true,
    type: STAR_TYPE,
    action: ADD_ACTION
});

const handleShowEditCategoryModal = (state) => ({
    ...state,
    open: true,
    type: CATEGORY_TYPE,
    action: EDIT_ACTION
});

const handleShowEditSeriesModal = (state) => ({
    ...state,
    open: true,
    type: SERIES_TYPE,
    action: EDIT_ACTION
});

const handleShowEditStarModal = (state) => ({
    ...state,
    open: true,
    type: STAR_TYPE,
    action: EDIT_ACTION
});

const handleHideFilterModal = (state) => ({
    ...state,
    open: false
});

export default createReducer(initialState, {
    [showAddCategoryModal]: handleShowAddCategoryModal,
    [showAddSeriesModal]: handleShowAddSeriesModal,
    [showAddStarModal]: handleShowAddStarModal,
    [showEditCategoryModal]: handleShowEditCategoryModal,
    [showEditSeriesModal]: handleShowEditSeriesModal,
    [showEditStarModal]: handleShowEditStarModal,
    [hideFilterModal]: handleHideFilterModal
});