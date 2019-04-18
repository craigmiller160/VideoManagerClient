import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';
import store from './store/store';
import AppContent from './components/AppContent/AppContent';
import './App.scss';
import variables from './_variables.scss';

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