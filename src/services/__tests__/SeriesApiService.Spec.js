import SeriesApiService from '../SeriesApiService';
import API from '../API';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(API);

const series = [
    { id: 1, seriesName: 'FirstSeries' },
    { id: 2, seriesName: 'SecondSeries' }
];

const newSeries = { id: 3, seriesName: 'ThirdSeries' };

beforeEach(() => {
    mock.onGet('/series')
        .reply(200, series);
    mock.onPost('/series', newSeries)
        .reply(200, newSeries);
    mock.onPut('/series/1', newSeries)
        .reply(200, newSeries);
    mock.onDelete('/series/1')
        .reply(200, newSeries);
});

describe('SeriesApiService', () => {
    it('Get All Series', async () => {
        try {
            const result = await SeriesApiService.getAllSeries();
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(series);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Add Series', async () => {
        try {
            const result = await SeriesApiService.addSeries(newSeries);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(newSeries);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Update Series', async () => {
        try {
            const result = await SeriesApiService.updateSeries(1, newSeries);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(newSeries);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Delete Series', async () => {
        try {
            const result = await SeriesApiService.deleteSeries(1);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(newSeries);
        }
        catch (ex) {
            throw ex;
        }
    });
});