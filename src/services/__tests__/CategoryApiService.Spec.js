import CategoryApiService from '../CategoryApiService';
import API from '../API';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(API);

const categories = [
    { id: 1, categoryName: 'FirstCategory' },
    { id: 2, categoryName: 'SecondCategory' }
];

const newCategory = { id: 3, categoryName: 'ThirdCategory' };

beforeEach(() => {
    mock.onGet('/categories')
        .reply(200, categories);
    mock.onPost('/categories', newCategory)
        .reply(200, newCategory);
    mock.onPut('/categories/1', newCategory)
        .reply(200, newCategory);
    mock.onDelete('/categories/1')
        .reply(200, newCategory);
});

describe('CategoryApiService', () => {
    it('Get All Categories', async () => {
        try {
            const result = await CategoryApiService.getAllCategories();
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(categories);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Add Category', async () => {
        try {
            const result = await CategoryApiService.addCategory(newCategory);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(newCategory);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Update Category', async () => {
        try {
            const result = await CategoryApiService.updateCategory(1, newCategory);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(newCategory);
        }
        catch (ex) {
            throw ex;
        }
    });

    it('Delete Category', async () => {
        try {
            const result = await CategoryApiService.deleteCategory(1);
            expect(result.status).toEqual(200);
            expect(result.data).toEqual(newCategory);
        }
        catch (ex) {
            throw ex;
        }
    });
});




