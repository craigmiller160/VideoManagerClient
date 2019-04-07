import StarApiService from '../../src/services/StarApiService';
import API from '../../src/services/API';
import MockAdapter from 'axios-mock-adapter';
import { BASE_STARS, NEW_STAR } from '../exclude/mock/mockData/starData';
import { mockAddNewStar, mockDeleteStar, mockGetAllStars, mockUpdateStar } from '../exclude/mock/mockApiConfig/starApi';

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
            expect(ex).toBeUndefined();
        }
    });

    it('Update Star', async () => {
        try {
            const result = await StarApiService.updateStar(3, NEW_STAR);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_STAR);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });

    it('Delete Star', async () => {
        try {
            const result = await StarApiService.deleteStar(3);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_STAR);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });
});