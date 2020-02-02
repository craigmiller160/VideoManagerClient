import { settingsData } from '../mockData/settingsData';

export const mockGetSettings = (mockApi) =>
    mockApi.onGet('/settings')
        .reply(200, settingsData);

export const mockUpdateSettings = (mockApi) =>
    mockApi.onPut('/settings', settingsData)
        .reply(200, settingsData);
