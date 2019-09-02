import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import { checkAuth, login, logout } from 'services/AuthApiService';
import {
    mockCheckAuthSuccess,
    mockLoginSuccess,
    mockLogout,
    mockPassword,
    mockTokenResponse,
    mockUserName
} from '../exclude/mock/mockApiConfig/authApi';

const mockApi = new MockAdapter(API);

describe('AuthApiService', () => {
    beforeEach(() => {
        mockApi.reset();
        mockCheckAuthSuccess(mockApi);
        mockLoginSuccess(mockApi);
        mockLogout(mockApi);
    });

    it('login', async () => {
        const res = await login(mockUserName, mockPassword);
        expect(res).toEqual(expect.objectContaining({
            status: 200,
            data: mockTokenResponse
        }));
    });

    it('checkAuth', async () => {
        const res = await checkAuth();
        expect(res.status).toEqual(204);
    });

    it('logout', async () => {
        const res = await logout();
        expect(res.status).toEqual(204);
    });
});