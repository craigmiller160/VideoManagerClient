// TODO write tests
import { createAction } from 'redux-starter-kit';
import { getSettings } from '../../services/SettingsApiService';
import { showErrorAlert } from '../alert/alert.actions';

export const setSettingsValues = createAction('settings/setSettingsValues');
export const setLoading = createAction('settings/setLoading');

export const loadSettings = () => async (dispatch) => {
    try {
        const res = await getSettings();
        dispatch(setSettingsValues(res.data));
    } catch (ex) {
        dispatch(showErrorAlert(ex.message));
    }
};

export const saveSettings = (values) => async (dispatch) => {
    // TODO finish this
};
