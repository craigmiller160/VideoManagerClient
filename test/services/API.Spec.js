import API, { addCsrfTokenInterceptor, handle401Interceptor } from '../../src/services/API';
import { CSRF_TOKEN_KEY } from 'utils/securityConstants';
import MockAdapter from 'axios-mock-adapter';
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

import store from 'store/store'; // eslint-disable-line import/first

const apiGetSpy = jest.spyOn(API, 'get');
const apiRequestSpy = jest.spyOn(API, 'request');

const contentType = 'Content-Type';
const applicationJson = 'application/json';

const mockApi = new MockAdapter(API);

describe('API', () => {
    beforeEach(() => {
        store.clearCsrfToken();
        store.clearActions();
        mockApi.reset();
        apiRequestSpy.mockClear();
        apiGetSpy.mockClear();
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
                message: '401 Error',
                response: {
                    status: 401
                },
                config: {
                    url: '/api/video-files'
                }
            };
            const res = await handle401Interceptor(error);
            expect(res.data).toEqual('Success');
            expect(apiGetSpy).toHaveBeenCalledWith('/auth/refresh');
            expect(apiRequestSpy).toHaveBeenCalledWith({
                ...error.config,
                url: '/video-files',
                rerun: true
            });
            expect(store.getActions()).toEqual([]);
        });

        it('skips refresh on 401 from refresh uri', async () => {
            const error = {
                message: '401 Error',
                response: {
                    status: 401
                },
                config: {
                    url: '/api/auth/refresh'
                }
            };

            try {
                await handle401Interceptor(error);
            } catch (ex) {
                expect(ex).toEqual(error);
            }

            expect(apiGetSpy).not.toHaveBeenCalled();
            expect(apiRequestSpy).not.toHaveBeenCalled();
            expect(store.getActions()).toEqual([]);
        });

        it('has an error during refresh', async () => {
            throw new Error('Finish this');
        });

        it('has error after refresh', async () => {
            mockApi.onGet('/auth/refresh')
                .reply(204);
            mockApi.onGet('/video-files')
                .reply(500, 'Error');

            const error = {
                message: '401 Error',
                response: {
                    status: 401
                },
                config: {
                    url: '/api/video-files'
                }
            };

            const expectedError = expect.objectContaining({
                config: expect.objectContaining({
                    url: '/api/video-files'
                }),
                response: expect.objectContaining({
                    data: 'Error',
                    status: 500
                }),
                suppressed: error
            });

            try {
                await handle401Interceptor(error);
            } catch (ex) {
                expect(ex).toEqual(expectedError);
            }

            expect(apiGetSpy).toHaveBeenCalledWith('/auth/refresh');
            expect(apiRequestSpy).toHaveBeenCalledWith({
                ...error.config,
                url: '/video-files',
                rerun: true
            });
            expect(store.getActions()).toEqual([]);
        });

        it('has error that is not noAuth', async () => {
            const error = {
                message: '500 Error',
                response: {
                    status: 500
                },
                config: {
                    url: '/video-files'
                }
            };

            try {
                await handle401Interceptor(error);
            } catch (ex) {
                expect(ex).toEqual(error);
            }

            expect(apiGetSpy).not.toHaveBeenCalled();
            expect(apiRequestSpy).not.toHaveBeenCalled();
            expect(store.getActions()).toEqual([]);
        });

        it('does not attempt refresh for rerun', async () => {
            const error = {
                message: '401 Error',
                config: {
                    url: '/api/video-files',
                    rerun: true
                },
                response: {
                    status: 401
                }
            };

            try {
                await handle401Interceptor(error);
            } catch (ex) {
                expect(ex).toEqual(error);
            }

            expect(apiGetSpy).not.toHaveBeenCalled();
            expect(apiRequestSpy).not.toHaveBeenCalled();
            expect(store.getActions()).toEqual([]);
        });
    });
});
