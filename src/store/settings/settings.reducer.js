// TODO write tests
import { createReducer } from 'redux-starter-kit';
import { setLoading, setSettingsValues } from './settings.actions';

const intialState = {
    loading: false,
    settingsValues: {}
};

const handleSetSettingsValues = (state, action) => ({
    ...state,
    settingsValues: action.payload
});

const handleSetLoading = (state, action) => ({
    ...state,
    loading: action.payload
});

export default createReducer(intialState, {
    [setSettingsValues]: handleSetSettingsValues,
    [setLoading]: handleSetLoading
});
