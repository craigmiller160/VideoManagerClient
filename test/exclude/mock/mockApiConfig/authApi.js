
export const mockCheckAuthSuccess = (mockApi) =>
    mockApi.onGet('/auth/check')
        .reply(200);

export const mockCheckAuthFail = (mockApi) =>
    mockApi.onGet('/auth/check')
        .reply(401);