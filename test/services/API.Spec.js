import { addTokenInterceptor } from '../../src/services/API';
import { CSRF_TOKEN_KEY } from 'utils/securityConstants';
import { mockCsrfToken } from '../exclude/mock/mockApiConfig/authApi';

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

import store from 'store/store'; // eslint-disable-line import/first

const contentType = 'Content-Type';
const applicationJson = 'application/json';

describe('API', () => {
    describe('addTokenInterceptor', () => {
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
            const result = addTokenInterceptor(config);
            expect(result).toEqual({
                ...config,
                headers: {
                    ...config.headers,
                    [CSRF_TOKEN_KEY]: mockCsrfToken
                }
            });
        });

        it('does not add token if not exists', () => {
            const result = addTokenInterceptor(config);
            expect(result).toEqual(config);
        });

        it('does not add token if method is get', () => {
            store.setCsrfToken(mockCsrfToken);
            const result = addTokenInterceptor({ ...config, method: 'get' });
            expect(result).toEqual({
                ...config,
                method: 'get',
                headers: {
                    ...config.headers
                }
            });
        });
    });
});