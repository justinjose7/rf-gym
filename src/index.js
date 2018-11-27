import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import reducer from './reducers'
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

const targetHtmlElement = document.getElementById('root');
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>

, targetHtmlElement);

registerServiceWorker();
