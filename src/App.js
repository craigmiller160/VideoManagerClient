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

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';
import store from './store/store';
import './App.scss';
import variables from './assets/styles/variables.module.scss';
import AppContent from './components/AppContent/AppContent';

const theme = {
    colors: {
        ...variables
    }
};

const App = () => (
    <>
        <Helmet>
            <title>Video Manager</title>
        </Helmet>
        <Provider store={ store }>
            <BrowserRouter>
                <ThemeProvider theme={ theme }>
                    <AppContent />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </>
);

export default App;