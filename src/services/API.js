import axios from 'axios';

const devApiRoot = 'http://localhost:8080';
const apiRoot = process.env.NODE_ENV !== 'production' ? `${devApiRoot}/api` : '/api';

export default axios.create({
    baseURL: apiRoot
});