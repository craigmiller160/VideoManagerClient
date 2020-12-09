/*
 *     VideoManagerClient
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const path = require('path');

module.exports = {
    title: 'Video Manager',
    devServerPort: 3001,
    devServerHttps: true,
    devServerProxy: {
        '/api': {
            target: 'https://localhost:8443',
            secure: false,
            logLevel: 'debug'
        },
        '/oauth2': {
            target: 'https://localhost:7003',
            secure: false,
            pathRewrite: {
                '^/oauth2': ''
            },
            changeOrigin: true,
            logLevel: 'debug'
        }
    },
    jestSetupFiles: [
        path.resolve(process.cwd(), 'test/setupTests.js')
    ]
};