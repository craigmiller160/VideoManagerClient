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

import { act } from 'react-dom/test-utils';
import { loadSettings, saveSettings, setLoading } from 'store/settings/settings.actions';
import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockGetSettings, mockUpdateSettings } from '../../exclude/mock/mockApiConfig/settingsApi';
import { settingsData } from '../../exclude/mock/mockData/settingsData';
import { showErrorAlert, showSuccessAlert } from '../../../src/store/alert/alert.actions';
import { mockCsrfOptions } from '../../exclude/mock/mockApiConfig/authApi';

const mockStore = configureMockStore([thunk]);
const mockApi = new MockAdapter(API);

describe('settings.actions', () => {
    it('setLoading', () => {
        const expectedAction = {
            type: setLoading.toString(),
            payload: true
        };
        expect(setLoading(true)).toEqual(expectedAction);
    });

    describe('thunk actions', () => {
        let store;
        beforeEach(() => {
            mockApi.reset();
            store = mockStore({});
        });

        describe('loadSettings', () => {
            it('loads settings', async () => {
                mockGetSettings(mockApi);
                await store.dispatch(loadSettings());
                expect(store.getActions()).toEqual([
                    { type: setLoading.toString(), payload: true },
                    expect.objectContaining({
                        type: '@@redux-form/INITIALIZE',
                        payload: settingsData
                    }),
                    { type: setLoading.toString(), payload: false }
                ]);
            });

            it('has error', async () => {
                await store.dispatch(loadSettings());
                expect(store.getActions()).toEqual([
                    { type: setLoading.toString(), payload: true },
                    {
                        type: showErrorAlert.toString(),
                        payload: expect.stringContaining('Error loading settings')
                    },
                    { type: setLoading.toString(), payload: false }
                ]);
            });
        });

        describe('saveSettings', () => {
            const values = {
                settingsId: 1,
                rootDir: '/home/user/videos'
            };

            it('saves settings', async () => {
                mockCsrfOptions(mockApi, '/settings');
                mockUpdateSettings(mockApi);
                let result;
                await act(async () => {
                    result = await store.dispatch(saveSettings(values));
                });
                expect(result).toEqual(true);
                expect(store.getActions()).toEqual([
                    { type: setLoading.toString(), payload: true },
                    expect.objectContaining({
                        type: '@@redux-form/INITIALIZE',
                        payload: settingsData
                    }),
                    { type: showSuccessAlert.toString(), payload: 'Settings saved successfully' },
                    { type: setLoading.toString(), payload: false }
                ]);
            });

            it('has error', async () => {
                let result;
                await act(async () => {
                    result = await store.dispatch(saveSettings(values));
                });
                expect(result).toEqual(false);
                expect(store.getActions()).toEqual([
                    { type: setLoading.toString(), payload: true },
                    {
                        type: showErrorAlert.toString(),
                        payload: expect.stringContaining('Error saving settings')
                    },
                    { type: setLoading.toString(), payload: false }
                ]);
            });
        });
    });
});
