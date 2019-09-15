import API, { addCsrfTokenInterceptor, handle401Interceptor } from '../../src/services/API';
import { CSRF_TOKEN_KEY } from 'utils/securityConstants';
import { mockCsrfToken } from '../exclude/mock/mockApiConfig/authApi';

jest.mock('store/store', () => {
    let csrfToken = '';
    let actions = [];

    return {
        getState() {
            return {
                auth: {
                    csrfToken
                }
            }
        },
        setCsrfToken(token) {
            csrfToken = token
        },
        clearCsrfToken() {
            csrfToken = '';
        },
        dispatch(action) {
            actions.push(action);
        },
        getActions() {
            return actions;
        },
        clearActions() {
            actions = [];
        }
    }
});

import store from 'store/store';
import MockAdapter from 'axios-mock-adapter'; // eslint-disable-line import/first

const contentType = 'Content-Type';
const applicationJson = 'application/json';

const mockApi = new MockAdapter(API);

describe('API', () => {
    beforeEach(() => {
        store.clearCsrfToken();
        store.clearActions();
        mockApi.reset();
    });

    describe('addCsrfTokenInterceptor', () => {
        const config = {
            method: 'post',
            headers: {
                [contentType]: applicationJson
            }
        };

        it('adds token if exists', () => {
            store.setCsrfToken(mockCsrfToken);
            const result = addCsrfTokenInterceptor(config);
            expect(result).toEqual({
                ...config,
                headers: {
                    ...config.headers,
                    [CSRF_TOKEN_KEY]: mockCsrfToken
                }
            });
        });

        it('does not add token if not exists', () => {
            const result = addCsrfTokenInterceptor(config);
            expect(result).toEqual(config);
        });

        it('does not add token if method is get', () => {
            store.setCsrfToken(mockCsrfToken);
            const result = addCsrfTokenInterceptor({ ...config, method: 'get' });
            expect(result).toEqual({
                ...config,
                method: 'get',
                headers: {
                    ...config.headers
                }
            });
        });
    });

    describe('handle401Interceptor', () => {
        it('does refresh for 401', async () => {
            mockApi.onGet('/auth/refresh')
                .reply(204);
            mockApi.onGet('/video-files')
                .reply(200, 'Success');

            const error = {
                response: {
                    status: 401
                },
                config: {
                    url: '/api/video-files'
                }
            };
            const res = await handle401Interceptor(error);
            expect(res.data).toEqual('Success');
            // TODO might want to do more tests for what happened along the way
        });

        it('skips refresh on 401 from refresh uri', () => {
            throw new Error('Finish this');
        });

        it('has error during refresh', () => {
            throw new Error('Finish this');
        });

        it('has error that is not noAuth', () => {
            throw new Error('Finish this');
        });
    });
});
