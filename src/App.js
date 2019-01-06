import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from 'store/store';

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <div>
                    <h1>My App</h1>
                </div>
            </Provider>
        );
    }
}

export default App;