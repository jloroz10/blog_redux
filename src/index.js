import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';

import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import reducers from './reducers';
import reduxThunk from 'redux-thunk';

import './css/iconos/eye.css';

const store = createStore(
  reducers, // son todos los reducers
  {}, // estado inicial
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>
    ,document.getElementById('root'));
