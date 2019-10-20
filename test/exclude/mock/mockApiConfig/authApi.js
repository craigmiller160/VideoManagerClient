import { CSRF_TOKEN_KEY, ROLE_EDIT } from '../../../../src/utils/securityConstants';

export const mockTokenResponse = { token: 'ABCDEFG' };
export const mockUserName = 'userName';
export const mockPassword = 'password';
export const mockCsrfToken = 'HIJKLMONP';
export const CSRF_TOKEN_TEST = 'csrf-token-test';
export const mockUserDetails = {
    userName: mockUserName,
    firstName: 'firstName',
    lastName: 'lastName',
    roles: [ { roleId: 1, name: ROLE_EDIT } ]
};
export const mockRoles = [
    { roleId: 1, name: 'Role' }
];

export const mockCheckAuthSuccess = (mockApi) =>
    mockApi.onGet('/auth/check')
        .reply((config) =>  [
            204,
            mockUserDetails,
            {
                [CSRF_TOKEN_KEY]: mockCsrfToken,
                [CSRF_TOKEN_TEST]: config.headers[CSRF_TOKEN_KEY] === 'fetch'
            }
        ]);

export const mockCheckAuthFail = (mockApi) =>
    mockApi.onGet('/auth/check')
        .reply((config) => [
            401,
            null,
            {
                [CSRF_TOKEN_KEY]: mockCsrfToken,
                [CSRF_TOKEN_TEST]: config.headers[CSRF_TOKEN_KEY] === 'fetch'
            }
        ]);

export const mockLoginSuccess = (mockApi) =>
    mockApi.onPost('/auth/login', { userName: mockUserName, password: mockPassword })
        .reply(204);

export const mockLoginFail = (mockApi) =>
    mockApi.onPost('/auth/login', { userName: mockUserName, password: mockPassword })
        .reply(401);

export const mockLogout = (mockApi) =>
    mockApi.onGet('/auth/logout')
        .reply(204);

export const mockGetVideoToken = (mockApi) =>
    mockApi.onGet('/auth/videotoken/3')
        .reply(200, mockTokenResponse);

export const mockGetRoles = (mockApi) =>
    mockApi.onGet('/auth/roles')
        .reply(200, mockRoles);

export const mockSaveUserProfile = (mockApi) =>
    mockApi.onPut('/auth/users/self', mockUserDetails)
        .reply(200, mockUserDetails);

export const mockGetAllUsers = (mockApi) =>
    mockApi.onGet('/auth/users')
        .reply(200, [mockUserDetails]);

export const mockGetUser = (mockApi) =>
    mockApi.onGet('/auth/users/admin/1')
        .reply(200, mockUserDetails);

export const mockSaveUserAdmin = (mockApi) =>
    mockApi.onPut('/auth/users/admin/1', mockUserDetails)
        .reply(200, mockUserDetails);

export const mockRevokeAccess = (mockApi) =>
    mockApi.onPost('/auth/users/revoke/1')
        .reply(200, mockUserDetails);

export const mockCreateUser = (mockApi) =>
    mockApi.onPost('/auth/users', mockUserDetails)
        .reply(200, mockUserDetails);