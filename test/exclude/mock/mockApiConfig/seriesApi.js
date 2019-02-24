import { BASE_SERIES, NEW_SERIES } from '../mockData/seriesData';

export const mockGetAllSeries = (mockApi) => {
    mockApi.onGet('/series')
        .reply(200, BASE_SERIES);
};

export const mockAddNewSeries = (mockApi) => {
    mockApi.onPost('/series', NEW_SERIES)
        .reply(200, NEW_SERIES);
};

export const mockUpdateSeries = (mockApi) => {
    mockApi.onPut('/series/3', NEW_SERIES)
        .reply(200, NEW_SERIES);
};

export const mockDeleteSeries = (mockApi) => {
    mockApi.onDelete('/series/1')
        .reply(200, NEW_SERIES);
};