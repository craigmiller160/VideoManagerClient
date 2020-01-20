// TODO write tests
/* eslint-disable */ // TODO delete this
import { createAction } from 'redux-starter-kit';
import { getSettings, updateSettings } from '../../services/SettingsApiService';
import { showErrorAlert, showSuccessAlert } from '../alert/alert.actions';
import { FORM_NAME } from '../../components/AppContent/Settings';
import { initialize } from 'redux-form';

export const setLoading = createAction('settings/setLoading');

export const loadSettings = () => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        const res = await getSettings();
        dispatch(initialize(FORM_NAME, res.data));
    } catch (ex) {
        dispatch(showErrorAlert(`Error loading settings: ${ex.message}`));
    } finally {
        dispatch(setLoading(false));
    }
};

export const saveSettings = (values) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await updateSettings(values);
        dispatch(initialize(FORM_NAME, res.data));
        dispatch(showSuccessAlert('Settings saved successfully'));
    } catch (ex) {
        dispatch(showErrorAlert(`Error saving settings: ${ex.message}`));
    } finally {
        dispatch(setLoading(false));
    }

};
