import { TOKEN_KEY } from '../../src/utils/securityConstants';
import { addTokenInterceptor } from '../../src/services/API';

const contentType = 'Content-Type';
const applicationJson = 'application/json';

describe('API', () => {
    describe('addTokenInterceptor', () => {
        beforeEach(() => {
            localStorage.clear();
        });

        it('adds token if exists', () => {
            const token = 'MyToken';
            localStorage.setItem(TOKEN_KEY, token);
            const config = {
                headers: {
                    [contentType]: applicationJson
                }
            };
            const result = addTokenInterceptor(config);
            expect(result).toEqual({
                headers: {
                    [contentType]: applicationJson,
                    Authorization: `Bearer ${token}`
                }
            });
        });

        it('does not add token if not exists', () => {
            const config = {
                headers: {
                    [contentType]: applicationJson
                }
            };
            const result = addTokenInterceptor(config);
            expect(result).toEqual({
                headers: {
                    [contentType]: applicationJson
                }
            });
        });
    });
});