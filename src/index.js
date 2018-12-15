import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

const targetHtmlElement = document.getElementById('root');

ReactDOM.render(<App />, targetHtmlElement);

registerServiceWorker();
