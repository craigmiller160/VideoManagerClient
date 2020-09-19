/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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

        return true;
    } catch (ex) {
        dispatch(handleApiError(ex, 'Error saving settings.'));
        return false;
    } finally {
        dispatch(setLoading(false));
    }

};
