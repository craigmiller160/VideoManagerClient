import MockAdapter from 'axios-mock-adapter';
import API from 'services/API';
import { checkAuth, login } from 'services/AuthApiService';

const mockApi = new MockAdapter(API);

const userName = 'userName';
const password = 'password';
const tokenPayload = {
    token: 'MyToken'
};

describe('AuthApiService', () => {
    beforeEach(() => {
        mockApi.reset();
        mockApi.onGet('/auth/check')
            .reply(204);
        mockApi.onPost('/auth/login', {
            userName,
            password
        })
            .reply(200, tokenPayload);
    });

    it('login', async () => {
        const res = await login(userName, password);
        expect(res).toEqual(expect.objectContaining({
            status: 200,
            data: tokenPayload
        }));
    });

    it('checkAuth', async () => {
        const res = await checkAuth();
        expect(res.status).toEqual(204);
    });
});