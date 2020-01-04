import API from './API';
import qs from 'qs';

export const getFilesFromDirectory = (path) =>
    API.get(`/localfiles/directory?${qs.stringify({ path })}`);
