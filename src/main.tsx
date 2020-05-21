import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { createStores } from 'app/stores';
import { App } from 'app';
import { Workbox } from 'workbox-window';

// enable MobX strict mode

configure({
  enforceActions: 'observed'
});

// prepare MobX stores
const history = createBrowserHistory();
const rootStore = createStores(history);

// init sentry
Sentry.init({
  dsn: 'https://031c29848d5e44f5a74b1ddd12cfd235@sentry.io/1375502'
});

// init PWA service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const wb = new Workbox('/service_worker.js');
    wb.register();
  });
}

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
