import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import store from './store/store';
import AppContent from './components/AppContent/AppContent';
import './App.scss';

const App = () => (
    <>
        <Helmet>
            <title>Video Manager</title>
        </Helmet>
        <Provider store={ store }>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </Provider>
    </>
);

export default App;