// -- React and related libs
import React from 'react';
import ReactDOM from 'react-dom';

// -- Redux
import { Provider } from 'react-redux';

// -- App
import App from './App';

// -- Service Worker
import * as serviceWorker from './serviceWorker';

// -- Data Store
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
