import { BASE_STARS, NEW_STAR } from '../mockData/starData';

export const mockGetAllStars = (mockApi) => {
    mockApi.onGet('/stars')
        .reply(200, BASE_STARS);
};

export const mockAddNewStar = (mockApi) => {
    mockApi.onPost('/stars', NEW_STAR)
        .reply(200, NEW_STAR);
};

export const mockUpdateStar = (mockApi) => {
    mockApi.onPut('/stars/3', NEW_STAR)
        .reply(200, NEW_STAR);
};

export const mockDeleteStar = (mockApi) => {
    mockApi.onDelete('/stars/3')
        .reply(200, NEW_STAR);
};