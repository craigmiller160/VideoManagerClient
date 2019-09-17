import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import { checkAuth, login, logout } from 'services/AuthApiService';
import {
    CSRF_TOKEN_TEST,
    mockCheckAuthSuccess, mockCsrfToken,
    mockLoginSuccess,
    mockLogout,
    mockPassword,
    mockTokenResponse,
    mockUserName
} from '../exclude/mock/mockApiConfig/authApi';
import { CSRF_TOKEN_KEY } from '../../src/utils/securityConstants';

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
        expect(res).toEqual(expect.objectContaining({
            status: 204,
            headers: expect.objectContaining({
                [CSRF_TOKEN_KEY]: mockCsrfToken,
                [CSRF_TOKEN_TEST]: true
            })
        }));
    });

    it('logout', async () => {
        const res = await logout();
        expect(res.status).toEqual(204);
    });
});