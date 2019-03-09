import SeriesApiService from '../../src/services/SeriesApiService';
import API from '../../src/services/API';
import MockAdapter from 'axios-mock-adapter';
import { BASE_SERIES, NEW_SERIES } from '../exclude/mock/mockData/seriesData';
import {
    mockAddNewSeries,
    mockDeleteSeries,
    mockGetAllSeries,
    mockUpdateSeries
} from '../exclude/mock/mockApiConfig/seriesApi';

const mockApi = new MockAdapter(API);

beforeEach(() => {
    mockApi.reset();
    mockGetAllSeries(mockApi);
    mockAddNewSeries(mockApi);
    mockUpdateSeries(mockApi);
    mockDeleteSeries(mockApi);
});

describe('SeriesApiService', () => {
    it('Get All Series', async () => {
        try {
            const result = await SeriesApiService.getAllSeries();
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(BASE_SERIES);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });

    it('Add Series', async () => {
        try {
            const result = await SeriesApiService.addSeries(NEW_SERIES);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_SERIES);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });

    it('Update Series', async () => {
        try {
            const result = await SeriesApiService.updateSeries(3, NEW_SERIES);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_SERIES);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });

    it('Delete Series', async () => {
        try {
            const result = await SeriesApiService.deleteSeries(3);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_SERIES);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });
});