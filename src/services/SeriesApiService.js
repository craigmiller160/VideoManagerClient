import API from './API';

const getAllSeries = () => {
    return API.get('/series');
};

const addSeries = (series) => {
    return API.post('/series', series);
};

const updateSeries = (seriesId, series) => {
    return API.put(`/series/${seriesId}`, series);
};

const deleteSeries = (seriesId) => {
    return API.delete(`/series/${seriesId}`);
};

export default {
    getAllSeries,
    addSeries,
    updateSeries,
    deleteSeries
}