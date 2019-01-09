import StarApiService from '../StarApiService';
import API from '../API';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(API);

const stars = [
    { id: 1, starName: 'FirstStar' },
    { id: 2, starName: 'SecondStar' }
];

const newStar = { id: 3, starName: 'ThirdStar' };

beforeEach(() => {
    mock.reset();
    mock.onGet('/stars')
        .reply(200, stars);
    mock.onPost('/stars', newStar)
        .reply(200, newStar);
    mock.onPut('/stars/1', newStar)
        .reply(200, newStar);
    mock.onDelete('/stars/1')
        .reply(200, newStar);
});

describe('StarApiService', () => {
    it('Get All Stars', async () => {
        try {
            const result = await StarApiService.getAllStars();
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(stars);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Add Star', async () => {
        try {
            const result = await StarApiService.addStar(newStar);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(newStar);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Update Star', async () => {
        try {
            const result = await StarApiService.updateStar(1, newStar);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(newStar);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Delete Star', async () => {
        try {
            const result = await StarApiService.deleteStar(1);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(newStar);
        }
        catch (ex) {
            throw ex;
        }
    });
});