
export const mockTokenResponse = { token: 'ABCDEFG' };
export const mockUserName = 'userName';
export const mockPassword = 'password';

export const mockCheckAuthSuccess = (mockApi) =>
    mockApi.onGet('/auth/check')
        .reply(204);

export const mockCheckAuthFail = (mockApi) =>
    mockApi.onGet('/auth/check')
        .reply(401);

export const mockLoginSuccess = (mockApi) =>
    mockApi.onPost('/auth/login', { userName: mockUserName, password: mockPassword })
        .reply(200, mockTokenResponse);

export const mockLoginFail = (mockApi) =>
    mockApi.onPost('/auth/login', { userName: mockUserName, password: mockPassword })
        .reply(401);