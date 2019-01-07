import axios from 'axios';
import { apiRoot } from './serviceConstants';

const api = axios.create({
    baseURL: `${apiRoot}/series`
});

const getAllSeries = () => {
    return api.get('/');
};

const addSeries = (series) => {
    return api.post('/', series);
};

const updateSeries = (seriesId, series) => {
    return api.put(`/${seriesId}`, series);
};

const deleteSeries = (seriesId) => {
    return api.delete(`/${seriesId}`);
};

export default {
    getAllSeries,
    addSeries,
    updateSeries,
    deleteSeries
}