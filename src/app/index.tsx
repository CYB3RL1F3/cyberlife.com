import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { Root } from 'app/containers/Root';
import routes, { RouteType } from './routes';

// render react DOM
export const App = hot(module)(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
        {routes.map(
          (route: RouteType): JSX.Element => (
            <Route
              key={`route__${route.key}`}
              exact
              path={route.path}
              component={route.component}
            />
          )
        )}
      </Switch>
    </Router>
  </Root>
));
