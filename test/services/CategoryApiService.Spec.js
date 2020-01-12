import CategoryApiService from 'services/CategoryApiService';
import API from 'services/API';
import MockAdapter from 'axios-mock-adapter';
import { BASE_CATEGORIES, NEW_CATEGORY } from '../exclude/mock/mockData/categoryData';
import {
    mockAddNewCategory,
    mockDeleteCategory,
    mockGetAllCategories,
    mockUpdateCategory
} from '../exclude/mock/mockApiConfig/categoryApi';

const mockApi = new MockAdapter(API);

beforeEach(() => {
    mockApi.reset();
    mockGetAllCategories(mockApi);
    mockAddNewCategory(mockApi);
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
            expect(ex).toBeUndefined();
        }
    });

    it('Update Category', async () => {
        try {
            const result = await CategoryApiService.updateCategory(3, NEW_CATEGORY);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_CATEGORY);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });

    it('Delete Category', async () => {
        try {
            const result = await CategoryApiService.deleteCategory(3);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(NEW_CATEGORY);
        }
        catch (ex) {
            expect(ex).toBeUndefined();
        }
    });
});




