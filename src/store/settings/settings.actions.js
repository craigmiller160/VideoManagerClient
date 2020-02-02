import { createAction } from 'redux-starter-kit';
import { getSettings, updateSettings } from '../../services/SettingsApiService';
import { handleApiError, showSuccessAlert } from '../alert/alert.actions';
import { FORM_NAME } from '../../components/AppContent/Settings';
import { initialize } from 'redux-form';

export const setLoading = createAction('settings/setLoading');

export const loadSettings = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await getSettings();
        dispatch(initialize(FORM_NAME, res.data));
    } catch (ex) {
        dispatch(handleApiError(ex, 'Error loading settings.'));
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
        return true; // TODO add to unit tests
    } catch (ex) {
        dispatch(handleApiError(ex, 'Error saving settings.'));
        return false; // TODO add to unit tests
    } finally {
        dispatch(setLoading(false));
    }

};
