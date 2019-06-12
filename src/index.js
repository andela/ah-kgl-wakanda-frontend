import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './store';
import Routes from './Components/Routes';

const routing = (
  <Provider store={store}>
    <Routes />
  </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
