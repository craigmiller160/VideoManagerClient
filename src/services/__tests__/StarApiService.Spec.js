import StarApiService from '../StarApiService';
import API from '../API';
import MockAdapter from 'axios-mock-adapter';
import { BASE_STARS, NEW_STAR } from '../../mock/mockData/starData';
import { mockAddNewStar, mockDeleteStar, mockGetAllStars, mockUpdateStar } from '../../mock/mockApiConfig/starApi';

const mockApi = new MockAdapter(API);

beforeEach(() => {
    mockApi.reset();
    mockGetAllStars(mockApi);
    mockAddNewStar(mockApi);
    mockUpdateStar(mockApi);
    mockDeleteStar(mockApi);
});

describe('StarApiService', () => {
    it('Get All Stars', async () => {
        try {
            const result = await StarApiService.getAllStars();
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(BASE_STARS);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });

    it('Add Star', async () => {
        try {
            const result = await StarApiService.addStar(NEW_STAR);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_STAR);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });

    it('Update Star', async () => {
        try {
            const result = await StarApiService.updateStar(1, NEW_STAR);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_STAR);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });

    it('Delete Star', async () => {
        try {
            const result = await StarApiService.deleteStar(1);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_STAR);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });
});