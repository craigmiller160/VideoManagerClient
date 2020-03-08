import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css'; // eslint-disable-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!video.js/dist/video-js.min.css'; // eslint-disable-line import/no-webpack-loader-syntax

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
