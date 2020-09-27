import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { createStores } from 'app/stores';
import { App } from 'app';
import { subscribe } from './app/utils/browsers';
import { updateSubscriptionOnServer } from 'app/actions';
import { GlobalStyle } from 'app/theme';

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

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <GlobalStyle />
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

// init PWA service worker
if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', () => {
    window.loaded = true;
    navigator.serviceWorker.register('/service-worker.js').then(async registration => {
      console.log('SW registered: ', registration);
      if ('Notification' in window) {
        const permission = await window.Notification.requestPermission();
        if (permission === "granted") {
          await subscribe(registration);
          registration.pushManager.getSubscription()
            .then((subscription) => {
              const isSubscribed = !(subscription === null);

              updateSubscriptionOnServer(subscription);
              
              if (isSubscribed) {
                console.log('User IS subscribed to notifications.');
              } else {
                console.log('User is NOT subscribed to notifications.');
              }
            }).catch(registrationError => {
              console.log('SW registration failed: ', registrationError);
            });
        }
      }
    });
    navigator.serviceWorker.ready.then(function (registration) {
      registration.update();
    });
  });
}