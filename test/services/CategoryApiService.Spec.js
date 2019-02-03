import CategoryApiService from '../../src/services/CategoryApiService';
import API from '../../src/services/API';
import MockAdapter from 'axios-mock-adapter';
import { BASE_CATEGORIES, NEW_CATEGORY } from '../../src/mock/mockData/categoryData';
import {
    mockAddCategory,
    mockDeleteCategory,
    mockGetAllCategories,
    mockUpdateCategory
} from '../../src/mock/mockApiConfig/categoryApi';

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
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });

    it('Add Category', async () => {
        try {
            const result = await CategoryApiService.addCategory(NEW_CATEGORY);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_CATEGORY);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });

    it('Update Category', async () => {
        try {
            const result = await CategoryApiService.updateCategory(1, NEW_CATEGORY);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_CATEGORY);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });

    it('Delete Category', async () => {
        try {
            const result = await CategoryApiService.deleteCategory(1);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_CATEGORY);
        }
        catch (ex) {
            console.log(ex);
            expect(ex).toBeUndefined();
        }
    });
});




