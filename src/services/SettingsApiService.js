import API from './API';

export const getSettings = () => API.get('/settings');

export const updateSettings = (settings) => API.put('/settings', settings);
