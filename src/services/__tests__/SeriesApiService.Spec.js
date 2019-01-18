import SeriesApiService from '../SeriesApiService';
import API from '../API';
import MockAdapter from 'axios-mock-adapter';
import { BASE_SERIES, NEW_SERIES } from '../../mock/mockData/seriesData';
import {
    mockAddNewSeries,
    mockDeleteSeries,
    mockGetAllSeries,
    mockUpdateSeries
} from '../../mock/mockApiConfig/seriesApi';

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
            throw ex;
        }
    });

    it('Add Series', async () => {
        try {
            const result = await SeriesApiService.addSeries(NEW_SERIES);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_SERIES);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Update Series', async () => {
        try {
            const result = await SeriesApiService.updateSeries(1, NEW_SERIES);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_SERIES);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Delete Series', async () => {
        try {
            const result = await SeriesApiService.deleteSeries(1);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_SERIES);
        }
        catch (ex) {
            throw ex;
        }
    });
});