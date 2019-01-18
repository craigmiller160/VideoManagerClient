import { BASE_CATEGORIES, NEW_CATEGORY } from '../mockData/categoryData';

export const mockGetAllCategories = (mockApi) => {
    mockApi.onGet('/categories')
        .reply(200, BASE_CATEGORIES);
};

export const mockAddCategory = (mockApi) => {
    mockApi.onPost('/categories', NEW_CATEGORY)
        .reply(200, NEW_CATEGORY);
};

export const mockUpdateCategory = (mockApi) => {
    mockApi.onPut('/categories/1', NEW_CATEGORY)
        .reply(200, NEW_CATEGORY);
};

export const mockDeleteCategory = (mockApi) => {
    mockApi.onDelete('/categories/1')
        .reply(200, NEW_CATEGORY);
};