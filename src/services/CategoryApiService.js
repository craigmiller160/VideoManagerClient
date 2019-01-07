import axios from 'axios';
import { apiRoot } from './serviceConstants';

const api = axios.create({
    baseURL: `${apiRoot}/categories`
});

const getAllCategories = () => {
    return api.get('/');
};

const addCategory = (category) => {
    return api.post('/', category);
};

const updateCategory = (categoryId, category) => {
    return api.put(`/${categoryId}`, category);
};

const deleteCategory = (categoryId) => {
    return api.delete(`/${categoryId}`);
};

export default {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory
}