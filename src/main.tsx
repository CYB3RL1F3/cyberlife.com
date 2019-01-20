import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { createStores } from 'app/stores';
import { App } from 'app';

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const history = createBrowserHistory();
const rootStore = createStores(history);

Sentry.init({
  dsn: 'https://031c29848d5e44f5a74b1ddd12cfd235@sentry.io/1375502'
});

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
