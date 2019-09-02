import { CSRF_TOKEN_KEY } from '../../../../src/utils/securityConstants';

export const mockTokenResponse = { token: 'ABCDEFG' };
export const mockUserName = 'userName';
export const mockPassword = 'password';
export const mockCsrfToken = 'HIJKLMONP';

export const mockCheckAuthSuccess = (mockApi) =>
    mockApi.onGet('/auth/check')
        .reply(204, null, {
            [CSRF_TOKEN_KEY]: mockCsrfToken
        });

export const mockCheckAuthFail = (mockApi) =>
    mockApi.onGet('/auth/check')
        .reply(401, null, {
            [CSRF_TOKEN_KEY]: mockCsrfToken
        });

export const mockLoginSuccess = (mockApi) =>
    mockApi.onPost('/auth/login', { userName: mockUserName, password: mockPassword })
        .reply(200, mockTokenResponse);

export const mockLoginFail = (mockApi) =>
    mockApi.onPost('/auth/login', { userName: mockUserName, password: mockPassword })
        .reply(401);

export const mockLogout = (mockApi) =>
    mockApi.onGet('/auth/logout')
        .reply(204);