import API from './API';

const getAllStars = () => {
    return API.get('/stars');
};

const addStar = (star) => {
    return API.post('/stars', star);
};

const updateStar = (starId, star) => {
    return API.put(`/stars/${starId}`, star);
};

const deleteStar = (starId) => {
    return API.delete(`/stars/${starId}`);
};

export default {
    getAllStars,
    addStar,
    updateStar,
    deleteStar
}