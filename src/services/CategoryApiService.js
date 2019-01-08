import API from './API';

const getAllCategories = () => {
    return API.get('/categories');
};

const addCategory = (category) => {
    return API.post('/categories', category);
};

const updateCategory = (categoryId, category) => {
    return API.put(`/categories/${categoryId}`, category);
};

const deleteCategory = (categoryId) => {
    return API.delete(`/categories/${categoryId}`);
};

export default {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory
}