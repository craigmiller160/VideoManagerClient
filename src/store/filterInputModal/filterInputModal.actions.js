import { createAction } from 'redux-starter-kit';

export const saveFilterChanges = (filter) => (dispatch, getState) => {
    // TODO finish this
};

export const showAddCategoryModal = createAction('showAddCategoryModal');
export const showAddSeriesModal = createAction('showAddSeriesModal');
export const showAddStarModal = createAction('showAddStarModal');
export const showEditCategoryModal = createAction('showEditCategoryModal');
export const showEditSeriesModal = createAction('showEditSeriesModal');
export const showEditStarModal = createAction('showEditStarModal');
export const hideFilterModal = createAction('hideFilterModal');