import CategoryApiService from '../CategoryApiService';
import API from '../API';
import MockAdapter from 'axios-mock-adapter';
import { BASE_CATEGORIES, NEW_CATEGORY } from '../../mock/mockData/categoryData';
import {
    mockAddCategory,
    mockDeleteCategory,
    mockGetAllCategories,
    mockUpdateCategory
} from '../../mock/mockApiConfig/categoryApi';

const mockApi = new MockAdapter(API);

beforeEach(() => {
    mockApi.reset();
    mockGetAllCategories(mockApi);
    mockAddCategory(mockApi);
    mockUpdateCategory(mockApi);
    mockDeleteCategory(mockApi);
});

describe('CategoryApiService', () => {
    it('Get All Categories', async () => {
        try {
            const result = await CategoryApiService.getAllCategories();
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(BASE_CATEGORIES);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Add Category', async () => {
        try {
            const result = await CategoryApiService.addCategory(NEW_CATEGORY);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_CATEGORY);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Update Category', async () => {
        try {
            const result = await CategoryApiService.updateCategory(1, NEW_CATEGORY);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_CATEGORY);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Delete Category', async () => {
        try {
            const result = await CategoryApiService.deleteCategory(1);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_CATEGORY);
        }
        catch (ex) {
            throw ex;
        }
    });
});




