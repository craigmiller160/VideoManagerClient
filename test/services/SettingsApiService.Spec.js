import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import { mockGetSettings, mockUpdateSettings } from '../exclude/mock/mockApiConfig/settingsApi';
import { getSettings, updateSettings } from '../../src/services/SettingsApiService';
import { settingsData } from '../exclude/mock/mockData/settingsData';

const mockApi = new MockAdapter(API);

describe('SettingsApiService', () => {
    beforeEach(() => {
        mockApi.reset();
        mockGetSettings(mockApi);
        mockUpdateSettings(mockApi);
    });

    it('getSettings', async () => {
        const res = await getSettings();
        expect(res).toEqual(expect.objectContaining({
            status: 200,
            data: settingsData
        }));
    });

    it('updateSettings', async () => {
        const res = await updateSettings(settingsData);
        expect(res).toEqual(expect.objectContaining({
            status: 200,
            data: settingsData
        }));
    });
});
