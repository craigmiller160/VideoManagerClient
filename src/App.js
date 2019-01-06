import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store/store';

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <h1>My App</h1>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;