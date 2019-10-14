import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import {
    checkAuth, getAllUsers,
    getRoles, getUser,
    getVideoToken,
    login,
    logout,
    saveUserProfile
} from 'services/AuthApiService';
import {
    CSRF_TOKEN_TEST,
    mockCheckAuthSuccess, mockCsrfToken, mockGetAllUsers, mockGetRoles, mockGetUser, mockGetVideoToken,
    mockLoginSuccess,
    mockLogout,
    mockPassword, mockRoles, mockSaveUserProfile,
    mockTokenResponse, mockUserDetails,
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
        mockGetVideoToken(mockApi);
        mockGetRoles(mockApi);
        mockSaveUserProfile(mockApi);
        mockGetAllUsers(mockApi);
        mockGetUser(mockApi);
    });

    it('login', async () => {
        const res = await login(mockUserName, mockPassword);
        expect(res).toEqual(expect.objectContaining({
            status: 204
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

    it('getVideoToken', async () => {
        const res = await getVideoToken(3);
        expect(res).toEqual(expect.objectContaining({
            status: 200,
            data: mockTokenResponse
        }));
    });

    it('getRoles', async () => {
        const res = await getRoles();
        expect(res).toEqual(expect.objectContaining({
            status: 200,
            data: mockRoles
        }));
    });

    it('saveUserProfile', async () => {
        const res = await saveUserProfile(mockUserDetails);
        expect(res).toEqual(expect.objectContaining({
            status: 200,
            data: mockUserDetails
        }));
    });

    it('getAllUsers', async () => {
        const res = await getAllUsers();
        expect(res).toEqual(expect.objectContaining({
            status: 200,
            data: [mockUserDetails]
        }));
    });

    it('getUser', async () => {
        const res = await getUser(1);
        expect(res).toEqual(expect.objectContaining({
            status: 200,
            data: mockUserDetails
        }));
    });
});
