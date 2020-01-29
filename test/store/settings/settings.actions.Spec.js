import { loadSettings, saveSettings, setLoading } from 'store/settings/settings.actions';
import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockGetSettings, mockUpdateSettings } from '../../exclude/mock/mockApiConfig/settingsApi';
import { settingsData } from '../../exclude/mock/mockData/settingsData';
import { showErrorAlert, showSuccessAlert } from '../../../src/store/alert/alert.actions';

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
                mockUpdateSettings(mockApi);
                await store.dispatch(saveSettings(values));
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
                await store.dispatch(saveSettings(values));
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
