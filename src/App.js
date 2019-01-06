import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import AppContent from './containers/AppContent/AppContent';

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <AppContent />
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;