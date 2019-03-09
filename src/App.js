import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import AppContent from './components/AppContent/AppContent';
import './App.scss';

const App = () => (
    <Provider store={ store }>
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    </Provider>
);

export default App;