import { createReducer } from "redux-starter-kit";
import { setCategories, setStars, setSeries, setSearching } from "./videoSearch.actions";

export const initialState = {
    filters: {
        categories: [],
        stars: [],
        series: []
    },
    searching: false
};

const handleSetCategories = (state, action) => ({
    ...state,
    filters: {
        ...state.filters,
        categories: action.payload || []
    }
});

const handleSetStars = (state, action) => ({
    ...state,
    filters: {
        ...state.filters,
        stars: action.payload || []
    }
});

const handleSetSeries = (state, action) => ({
    ...state,
    filters: {
        ...state.filters,
        series: action.payload || []
    }
});

const handleSetSearching = (state, action) => ({
    ...state,
    searching: action.payload
});

export default createReducer(initialState, {
    [setCategories]: handleSetCategories,
    [setStars]: handleSetStars,
    [setSeries]: handleSetSeries,
    [setSearching]: handleSetSearching
});