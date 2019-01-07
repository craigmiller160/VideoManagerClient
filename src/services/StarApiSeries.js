import axios from 'axios';
import { apiRoot } from './serviceConstants';

const api = axios.create({
    baseURL: `${apiRoot}/series`
});

const getAllStars = () => {
    return api.get('/');
};

const addStar = (star) => {
    return api.post('/', star);
};

const updateStar = (starId, star) => {
    return api.put(`/${starId}`, star);
};

const deleteStar = (starId) => {
    return api.delete(`/${starId}`);
};

export default {
    getAllStars,
    addStar,
    updateStar,
    deleteStar
}