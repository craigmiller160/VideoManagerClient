import { addCsrfTokenInterceptor } from '../../src/services/API';
import { CSRF_TOKEN_KEY } from 'utils/securityConstants';
import { mockCsrfToken } from '../exclude/mock/mockApiConfig/authApi';
import store from 'store/store'; // eslint-disable-line import/first

jest.mock('store/store', () => {
    let csrfToken = '';

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
        }
    }
});

const contentType = 'Content-Type';
const applicationJson = 'application/json';

describe('API', () => {
    describe('addCsrfTokenInterceptor', () => {
        const config = {
            method: 'post',
            headers: {
                [contentType]: applicationJson
            }
        };

        beforeEach(() => {
            store.clearCsrfToken();
        });

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
        it('does refresh for 401', () => {
            throw new Error('Finish this');
        });

        it('skips refresh on 401 from refresh uri', () => {
            throw new Error('Finish this');
        });

        it('has error during refresh', () => {
            throw new Error('Finish this');
        });
    });
});
